const {validateLoginData} = require("../util/validators");
const {admin, db} = require("../util/admin");
const firebase = require("firebase");

exports.getAllUsers = (req, res, next) => {

    const page = req.query.page * 1 || 1;

    db.collection('users')
        .orderBy('createdAt', 'desc')
        .offset(page)
        .get()
        .then((data) => {
            let users = [];
            data.forEach((doc) => {
                users.push({
                    userId: doc.id,
                    ...doc.data()
                })
            })
            return res.json(users)
        })
        .catch((err) => {
            res.status(500).json({error: err.code})
        })
}

exports.makeAdmin = (req, res, next) => {

    const {email} = req.body

    admin
        .auth()
        .getUserByEmail(email)
        .then((user) => {
            // Confirm user is verified.
            if (user.emailVerified) {
                // Add custom claims for additional privileges.
                // This will be picked up by the user on token refresh or next sign in on new device.
                return admin.auth().setCustomUserClaims(user.uid, {
                    admin: true,
                })
            }
        })
        .then(() => {
            res.status(200).json({Message: "User Successfully made as an admin"})
        })
        .catch((error) => {
            res.send(error)
        });
}

exports.adminLogin = (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    const {valid, errors} = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);

    try {
        firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                if (!data.user.emailVerified) {
                    throw Error('Please verify your email before SignIn');
                    //res.send("Email sent")
                } else {
                    return data.user.getIdToken();
                }
            })
            .then((token) => {
                req.token = token;
                next()
                // return res.json({ token });
            })
            .catch((err) => {
                return res.status(400).json({error: err.message})
            });
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

//Admin login middleware

exports.verifyAdmin = (req, res, next) => {
    const {token} = req;
    try {
        admin
            .auth()
            .verifyIdToken(req.token)
            .then((claims) => {
                if (claims.admin === true) {
                    return res.json({token})
                }
                throw Error('Unauthorized')

            }).catch((e) => {
            res.status(401).json({
                error: e.message
            })
        })

    } catch (e) {
        res.status(401).json({
            error: e.message
        })
    }
}


exports.getUserByID = (req, res, next, id) => {
    try {
        admin
            .auth()
            .getUser(id)
            .then((userRecord) => {
                req.profile = userRecord.toJSON()
                next();
            })
            .catch((error) => {
                return res.status(401).json({
                    error: error.message
                })
            });
    } catch (e) {
        res.status(401).json({
            error: e.message
        })
    }
}

exports.getAdmins = (req, res, next) => {
    const users = [];
    admin
        .auth()
        .listUsers(1000)
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
                if (userRecord && userRecord.customClaims && userRecord.customClaims.admin) {
                    users.push(userRecord)
                }
                // console.log('user', userRecord.toJSON());
            });
            res.send(users)
        })
        .catch((error) => {
            console.log('Error listing users:', error);
        });
}

exports.getConsultants = (req, res, next) => {
    const consultants = [];
    admin
        .auth()
        .listUsers(1000)
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
                if (userRecord && userRecord.customClaims && userRecord.customClaims.consultant) {
                    consultants.push(userRecord)
                }
                // console.log('user', userRecord.toJSON());
            });
            res.send(consultants)
        })
        .catch((error) => {
            console.log('Error listing users:', error);
            res.send(error.message)
        });
}

exports.getCustomer = (req, res, next) => {
    const customer = [];
    admin
        .auth()
        .listUsers(1000)
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
                if (userRecord && userRecord.customClaims && userRecord.customClaims.customer) {
                    customer.push(userRecord)
                }
                // console.log('user', userRecord.toJSON());
            });
            res.send(customer)
        })
        .catch((error) => {
            console.log('Error listing users:', error);
            res.send(error.message)
        });
}

//check the user is authenticated
exports.isAuthenticated = (req, res, next) => {


    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        req.idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({error: 'Unauthorized'});
    }

    admin
        .auth()
        .verifyIdToken(req.idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;

            let checker = req.profile && uid && req.profile.uid === uid;
            if (!checker) {
                return res.status(403).json({
                    error: "Access denied"
                })
            }
            next();
            // ...
        })
        .catch((e) => {
            // Handle error
            res.status(400).json({error: e.message})
        });


};

exports.getUser = (req, res, next) => {

    res.send(req.profile)
}

//check if the user is admin
exports.isAdmin = (req, res, next) => {

    try {
        admin
            .auth()
            .getUser(req.profile.uid)
            .then((userRecord) => {
                if (userRecord.customClaims && userRecord.customClaims.admin) {
                    return next()
                }
                throw Error('Unauthorized')
            }).catch((e) => {
            res.status(401).json({
                error: e.message
            })
        })

    } catch (e) {
        res.status(401).json({
            error: e.message
        })
    }

}

exports.isConsultant = (req, res, next) => {

    try {
        admin
            .auth()
            .getUser(req.profile.uid)
            .then((userRecord) => {
                if (userRecord.customClaims && userRecord.customClaims.consultant) {
                    return next()
                }
                throw Error('Unauthorized')
            }).catch((e) => {
            res.status(401).json({
                error: e.message
            })
        })

    } catch (e) {
        res.status(401).json({
            error: e.message
        })
    }

}

exports.addCons = (req, res, next) => {

    let caseData = {};
    const {consultantID, consultantName, index} = req.body;

    db.doc(`/cases/${req.params.caseID}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({error: 'Case not found'});
            }
            caseData = doc.data();

            caseData.specifications[index].consultant = {
                uid: consultantID,
                displayName: consultantName
            };


            db.doc(`/cases/${req.params.caseID}`)
                .set(caseData)
                .then(() => {
                    res.status(200).json({
                        message: 'Case Updated'
                    })
                })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});
        });


}


exports.specList = async (req, res, next) => {

    db.collection('specification')
        // .orderBy('createdTime', 'desc')
        .get()
        .then((data) => {
            let spec = [];
            data.forEach((doc) => {
                spec.push({
                    specId: doc.id,
                    ...doc.data()
                });
            });
            return res.json(spec);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
}

exports.updateSpec = (req, res, next) => {
    const {sub, Technology} = req.body;

    const {specID} = req.params;

    let found = false;

    let specData = {}

    db.doc(`/specification/${specID}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({error: 'Specification not found'});
            }
            specData = doc.data();

            for (let key in specData.Technology) {

                if (key === Technology) {
                    found = true
                    console.log('keys are', key)
                    let value = specData.Technology[key];
                    console.log(value.push(sub))
                }

            }

            if (found === false) {

                specData.Technology[Technology] = [sub]
            }

            console.log(specData)

            // return res.send(specData)

            // res.status(200).json(specData)

            db.doc(`/specification/${specID}`)
                .set(specData)
                .then(() => {
                    res.status(200).json({
                        message: 'Specification Updated'
                    })
                })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});
        });


}

exports.addSpec = (req, res, next) => {

    const {Vendor} = req.body

    if(Vendor==='' || Vendor===null || Vendor===undefined ){
        return res.status(400).send('Fill all the field')
    }


    db.collection('specification')
        .add(req.body)
        .then((doc) => {
            res.json({...req.body, specId: doc.id});
        })
        .catch((err) => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });


}

exports.getAllAlertCases = (req,res)=>{
    db.collection('cases')
        .orderBy('createdTime', 'desc')
        .get()
        .then((data) => {
            let cases = [];
            const alertCases=[]
            data.forEach((doc) => {
                cases.push({
                    caseId: doc.id,
                    ...doc.data()
                });
            });

            cases.map((item,index)=>{

                item.specifications.map((i)=>{
                    if(i.consultant === 'System Pick'){
                       return alertCases.push(item)
                    }
                })
            })

            return res.json({
                count:alertCases.length,
                data:alertCases
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}
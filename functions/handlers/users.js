

const { admin, db } = require("../util/admin");

const config = require("../util/config");
const { uuid } = require("uuidv4");

const firebase = require("firebase");
const  app =firebase.initializeApp(config);
const auth = app.auth()

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
  validateSignupEmail,
} = require("../util/validators");


//Check user exists before signup
exports.signupCheckUser = (req, res) => {
  const { email } = req.query;
  const { valid, errors } = validateSignupEmail(email);

  if (!valid) return res.status(400).json(errors);

  const noImg = "no-img.png";

  firebase.auth().fetchSignInMethodsForEmail(email)
    .then((data) => {
      if(data && data.length > 0){
        return res.status(200).json({ userExists: true });
      } else if(data && data.length === 0) {
        return res.status(200).json({ userExists: false });
      }
    })
    .catch((err) => {
      console.log('printing error');
      console.error(err);
    });
};

// Sign users up
exports.signup = async(req, res) => {
  const newUser = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    country:req.body.country
  };



  //Todo: User Data Validation
  // const { valid, errors } = validateSignupData(newUser);
  // if (!valid) return res.status(400).json(errors);

  const noImg = "no-img.png";
  let token, userId;

  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(async (data)=> {
          await data.user.updateProfile({
              displayName:newUser.firstName
          })
        userId = data.user.uid;
        token = data.user.getIdToken();
        return data.user.sendEmailVerification();
      })
      .then(()=>{
          if(req.query.name){
              return admin.auth().setCustomUserClaims(userId, {
                  consultant : true
              });
          }else{
              return admin.auth().setCustomUserClaims(userId, {
                  customer : true
              });
          }
      })
      .then(()=> {
        const userCredentials = {
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          country: newUser.country,
          assignCases : [],
          createdAt: new Date().toISOString(),
          //TODO Append token to imageUrl. Work around just add token from image in storage.
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
          userId,
        };
        //return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        return db.collection('users').doc(userId).set(userCredentials)
      })
       .then((result)=>{
            res.status(201).json({
              Success:`User ${userId} created Successfully`,
              token:token.i
         })
       })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return res.status(400).json({ email: "Email is already in use" });
        }
        else if(err.code==='auth/weak-password'){
          return res.status(400).json({error:"Weak Password"})
        }
        else {
          return res
              .status(500)
              .json({ general: err.message });
        }
      });

};

// Log user in
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  try{
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
          return res.json({ token });
        })
        .catch((err) => {
          return res.status(400).json({error:err.message})
        });
  }catch(e){
    res.status(400).json({error:e.message})
  }


};

exports.emailVerify =(req,res,next)=>{
  const {user} = req.body
  user.user.sendEmailVerification().then(function() {
    // Email sent.
    res.send("Email sent")
  }).catch(function(error) {
    // An error happened.
    console.log(error)
    res.status(400).json({error:error.message})
  });
}

exports.verifyToken=(req,res,next)=>{
    let idToken;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
      idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
      console.error('No token found');
      return res.status(403).json({ error: 'Unauthorized' });
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            if (decodedToken.admin === true) {
                console.log("Admin Login")
            }
          req.user = decodedToken;
          return res.status(200).json({
            Message:"Valid Token",
            User:req.user
          });
        })
        .catch((err) => {
          console.error('Error while verifying token ', err);
          return res.status(403).json(err);
        });
  };


// Add user details
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.userId}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
// Get any user's details
exports.getUserDetails = (req, res) => {
  console.log(req.params);
  let userData = {};
  db.doc(`/users/${req.params.userId}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return res.json(userData);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
// Upload a profile image for user
exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Append token to url
        console.log("$$$$$$$$$$$$$$$$$$$$$$$", req.user.uid);
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/users/${req.user.uid}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};



exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach((notificationId) => {
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, { read: false });
  });
  batch
    .commit()
    .then(() => {
      return res.json({ message: "Notifications marked read" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getAuthUser = (req,res,next)=>{
    res.send(req.user)
}

exports.emailVerifcation = (req,res,next)=>{
    const actionCode = req.query.oobCode;
    auth.applyActionCode(actionCode).then(function(resp) {

        return res.status(200).json({message:'Email address has been verified'})

        // Email address has been verified.

        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.

        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
    }).catch(function(error) {
        return res.status(401).json({error:error.message})
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
    });
    // }
}

exports.authToken = (req,res,next)=>{
    const {token} = req.body
    var credential = firebase.auth.GoogleAuthProvider.credential(token);

    firebase.auth().signInAndRetrieveDataWithCredential(credential)
        .then((response)=>{

            const {uid} = response.user;
            const {email,given_name,family_name,picture} = response.additionalUserInfo.profile


            if(response.additionalUserInfo.isNewUser){
                const userCredentials = {
                    email: email,
                    firstName: given_name,
                    lastName: family_name,
                    // country: newUser.country,
                    createdAt: new Date().toISOString(),
                    //TODO Append token to imageUrl. Work around just add token from image in storage.
                    imageUrl: picture,
                    userId:uid,
                };

                //return db.doc(`/users/${newUser.handle}`).set(userCredentials);
                db.collection('users').doc(uid).set(userCredentials)
                    .then(()=>{
                        console.log('user has been created')
                    })
                    .catch((e)=>{
                        console.log(e.message)
                    })
            }
            res.send(response.user)
        })
        .catch(function(error) {
            console.log(error.message)

    });
}

exports.getBadgeForConsultant = async (req,res)=>{


    db.doc(`/users/${req.profile.uid}`)
        .get()
        .then((doc)=>{

            const cases = doc.data().notifications
            const arr = []
            if(cases.length!==0){
                cases.map((item)=>{
                    if(item.read===false){
                        arr.push(item)
                    }
                })
                return res.status(200).json({
                    count:arr.length,
                    data:arr
                })

            }
            else{
                res.send('No Cases has bee assigned to the consultant')
            }
        })
        .catch((e)=>{
            console.log(e.message)
        })
}



//Profile (02)
exports.profile = async(req, res) => {
  const newUser = {
    contractorName : req.body.contractorName,
    addressLine1 : req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city:req.body.city,
    stateProvinceRegion:req.body.stateProvinceRegion,
    zipPostalCode:req.body.zipPostalCode,
    country:req.body.country,
    phone1:req.body.phone1,
    phone2:req.body.phone2,
    types : req.body.types
    
  };

  let token, userId;

  firebase.auth().createUserProfile()
          .then(async (data)=> {
           
          userId = data.user.uid;
          token = data.user.getIdToken();
          
        })
       .then(()=> {
        const userCredentials = {
          contractorName: newUser.contractorName,
          addressLine1: newUser.addressLine1,
          addressLine2:newUser.addressLine2,
          city:newUser.city,
          stateProvinceRegion:newUser.stateProvinceRegion,
          zipPostalCode:newUser.zipPostalCode,
          country:newUser.country,
          phone1:newUser.phone1,
          phone2:newUser.phone2,
          types:newUser.types,
         
          userId,
          
        };
        //return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        return db.collection('users').doc(userId).set(userCredentials)
        
      
      })
      
       .then((result)=>{
            res.status(201).json({
              Success:`User ${userId} created Successfully`,
              token:token.i
         })
       })
      .catch((err) => {
        console.error(err);
       
      });
      
};

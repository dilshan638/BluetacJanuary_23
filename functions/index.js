const functions = require('firebase-functions');
const app = require('express')();
var path = require('path');
const { db } = require('./util/admin');
const FBAuth = require('./util/fbAuth');

const cors = require('cors');
const {getAllAlertCases} = require("./handlers/adminApp");
const {getBadgeForConsultant} = require("./handlers/users");
const {isConsultant} = require("./handlers/adminApp");
const {markNotificationsRead} = require("./handlers/users");
const {addSpec} = require("./handlers/adminApp");
const {updateSpec} = require("./handlers/adminApp");

const {getAllCasesAdmin} = require("./handlers/cases");
const {authToken} = require("./handlers/users");
const {
    addCons,
    getAdmins,
    verifyAdmin,
    adminLogin,
    makeAdmin,
    getUserByID,
    getAllUsers,
    getUser,
    isAuthenticated,
    isAdmin,
    getConsultants,
    getCustomer,
    specList
} = require("./handlers/adminApp");


app.use(cors({origin: true}));

const {
    getAllCases,
    postOneCase,
    getCase,
    deleteCase
} = require('./handlers/cases');
const {
    signup,
    signupCheckUser,
    login,
    uploadImage,
    addUserDetails,
    getUserDetails,
    verifyToken,
    emailVerify,
    getAuthUser,
    emailVerifcation,
    //test//(01)
} = require('./handlers/users');


// Scream routes
app.get('/cases', FBAuth, getAllCases);
app.post('/case', FBAuth, postOneCase);
app.get('/case/:caseId', getCase);
app.delete('/case/:caseId', FBAuth, deleteCase);

// users routes
app.post('/signup', signup);
//app.post('/profile', test);//(01)
app.get('/checkUser', signupCheckUser);
app.post('/verifyToken', verifyToken)
app.get('/SentEmail', emailVerify)
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user/:userId', getUserDetails);

app.get('/check', FBAuth, getAuthUser)
app.get('/checkEmail', emailVerifcation)

//Admin app routes
app.get('/admin/users/', getAllUsers);
app.get('/admin/getAllCase/:userID', isAuthenticated, isAdmin, getAllCasesAdmin)

app.get('/admin/getAllAlertCases/:userID',isAuthenticated, isAdmin,getAllAlertCases)

app.put('/admin/updateSpec/:userID/:specID', isAuthenticated, isAdmin, updateSpec)
app.post('/admin/addSpec/:userID', isAuthenticated, isAdmin, addSpec)

//checking user authenticated => isAuthenticated
app.post('/admin/makeAdmin/:userID', isAuthenticated, isAdmin, makeAdmin)

app.post('/admin/Login', adminLogin, verifyAdmin)

app.get('/admin/getAllSpec/:userID', isAuthenticated, specList)

//User middleware
app.param('userID', getUserByID)

//checking user authenticated => isAuthenticated
app.get('/getUser/:userID', isAuthenticated, getUser)

//get All admins
app.get('/getAdmins/:userID', isAuthenticated, isAdmin, getAdmins)

//get All consultants
app.get('/getConsultants/:userID', isAuthenticated, getConsultants)

//get All customer
app.get('/getCustomers/:userID', isAuthenticated, isAdmin, getCustomer)

//add consultant to existing case
app.put('/addCons/:userID/:caseID', isAuthenticated, isAdmin, addCons)

// Build Firebase credential with the Google ID token.
app.post('/getToken', authToken)

app.post('/notifications',markNotificationsRead)

//get Notification count for consultant
app.get('/getBadgeCount/:userID', isAuthenticated, isConsultant, getBadgeForConsultant)

exports.asignConsultantOnCaseCreation = functions
    .region('asia-northeast1')
    .firestore.document('cases/{id}')
    .onCreate(async (snapshot) => {

        try {
            const specifications = snapshot.data().specifications

            console.log('before', specifications)

            const userRef = db.collection('users');
            const snap = await userRef.where('available', '==', true).get();
            if (snap.empty) {
                console.log('No matching documents')
            } else {
                if (specifications.length !== 0) {
                    specifications.map(async (item, index) => {

                        if (item.consultant === 'System Pick') {


                            if (index < snap.docs.length) {
                                item.consultant = {
                                    displayName: snap.docs[index].data().firstName,
                                    uid: snap.docs[index].data().userId
                                }

                                let caseData = []

                                db.doc(`/users/${snap.docs[index].data().userId}`)
                                    .get()
                                    .then(async (doc) => {
                                        if (!doc.exists) {
                                            return '';
                                        }
                                        if (doc.data().assignCases) {
                                            caseData = doc.data().assignCases;
                                        }

                                        caseData.push({
                                            assignDate: new Date().toISOString(),
                                            case: snapshot.data(),
                                            read: false
                                        })

                                        const newUserData = db.collection('users').doc(`${snap.docs[index].data().userId}`);

                                        await newUserData.update({assignCases: caseData});
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                    });


                            }
                        }

                    })
                    const updatedCase = db.collection('cases').doc(`${snapshot.id}`);

                    await updatedCase.update({specifications: specifications});

                }
            }

        }catch (e){
            console.log("Something went wrong",e.message)
        }
    });

exports.api = functions.region('asia-northeast1').https.onRequest(app);


exports.landing = functions.https.onRequest(async (req, res) => {
    // Send back a message that we've succesfully written the message
    res.sendFile(path.join(__dirname + '/landing/index.html'));
});

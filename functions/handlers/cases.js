const {sendEmail} = require("../util/mail");
const { db } = require('../util/admin');

//case listing for admin
exports.getAllCasesAdmin = (req, res) => {
    db.collection('cases')
        .orderBy('createdTime', 'desc')
        .get()
        .then((data) => {
            let cases = [];
            data.forEach((doc) => {
                cases.push({
                    caseId: doc.id,
                    ...doc.data()
                });
            });
            return res.json(cases);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

//Case listing for consultant
exports.getAllCases = (req, res) => {
  db.collection('cases')
    .where('customerId', '==', req.user.userId)
    .orderBy('createdTime', 'desc')
    .get()
    .then((data) => {
      let cases = [];
      data.forEach((doc) => {
        cases.push({
          caseId: doc.id,
          ...doc.data()
        });
      });
      return res.json(cases);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.postOneCase = (req, res) => {
  // if (req.body.body.trim() === '') {
  //   return res.status(400).json({ body: 'Body must not be empty' });
  // }
  const newCase = {
    ...req.body,
    customerId: req.user.userId,
    createdTime: new Date().toISOString(),
  };

  db.collection('cases')
    .add(newCase)
    .then((document) => {

        const specifications = newCase.specifications;
        // let caseData = []
        if( specifications.length!==0){
            specifications.map((item)=>{

                let caseData = []
                let notifications= []

                if(item.consultant!=='System Pick'){
                    db.doc(`/users/${item.consultant.uid}`)
                        .get()
                        .then(async (doc) => {
                            if (!doc.exists) {
                                return '';
                            }

                            if(doc.data().assignCases){
                                caseData = doc.data().assignCases;
                            }
                            // caseData = doc.data().assignCases;

                            if(doc.data().notifications){
                                notifications = doc.data().notifications
                            }

                            caseData.push({
                                assignDate : new Date().toISOString(),
                                caseId:document.id,
                                // read:false
                            })

                            notifications.push({
                                title:newCase.title,
                                subject:"Case assign",
                                date:new Date().toISOString(),
                                sendBy: newCase.customerId,
                                read:false
                            })

                            const newUserData = db.collection('users').doc(`${item.consultant.uid}`);

                            await newUserData.update({assignCases: caseData,notifications:notifications});

                            await sendEmail(
                                    doc.data().email,
                                `Congratulation! You have been assign for New case`,
                                `New case of ${newCase.title} has been assign to you`)

                        })
                        .catch((err) => {
                            console.error(err);
                        });

                }
            })
        }

      res.json({...newCase, caseId: document.id});
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
};
// Fetch one case
exports.getCase = (req, res) => {
  let caseData = {};
  db.doc(`/cases/${req.params.caseId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Case not found' });
      }
      caseData = doc.data();
      caseData.caseId = doc.id;
      return res.json(caseData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Delete a case
exports.deleteCase = (req, res) => {
  const document = db.doc(`/cases/${req.params.caseId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Case not found' });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Case deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};


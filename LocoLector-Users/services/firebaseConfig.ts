import admin from 'firebase-admin';

const serviceAccount = require('../lokolector-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;

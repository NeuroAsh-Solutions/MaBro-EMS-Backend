const admin = require('firebase-admin');
const serviceAccount = require('../firebaseServiceAccountKey.json');

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });

    console.log('Firebase Admin initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
}

const db = admin.firestore();
module.exports = db;
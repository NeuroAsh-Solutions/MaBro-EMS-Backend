const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Check if any Firebase apps exist
if (admin.apps.length) {
  console.log("Using existing Firebase app");
} else {
  console.log("Initializing new Firebase app");
  // Explicitly load the service account
  const serviceAccountPath = path.join(__dirname, "firebaseServiceAccountKey.json");
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

  // Create app with default name
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
    authDomain: `${serviceAccount.project_id}.firebaseapp.com`,
  });
}

// Get the auth instance explicitly
const auth = admin.auth();
const db = admin.firestore();

console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
console.log("Firestore initialized:", !!db);
console.log("Firestore collection method exists:", typeof db.collection === 'function');

module.exports = { admin, auth, db };
const admin = require("firebase-admin");

const serviceAccount = require("../cert/whatmeowmeow-58a8b-firebase-adminsdk-u3b08-eb9a62c84c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://whatmeowmeow-58a8b-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();

module.exports = db;
const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");

var serviceAccount = require("../firebase-key.json");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "socialpet-ren.appspot.com",
});

const bucket = getStorage().bucket();

module.exports = { bucket };

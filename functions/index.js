const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const oauth = require("./oauth");
exports.credentials = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    oauth
      .getTokenPublic()
      .then(credentials => {
        console.log(credentials);
        response.json({
          access_token: credentials.access_token,
          expires_in: credentials.expires_in
        });
      })
      .catch(error => {
        console.log("Error por index.js");
        console.log(error);
        response.status(500).json(error);
      });
  });
});

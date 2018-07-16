const functions = require("firebase-functions");

exports.credentials = functions.https.onRequest((request, response) => {
  response.json({
    access_token:
      "eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJjbGllbnRfaWQiOiJLaUJyeDZwUkRycFVWQjRFTEEzekpqM1BBaDk5UkV1ZyIsImV4cCI6MTUzMTc3ODQ5MSwic2NvcGUiOlsidmlld2FibGVzOnJlYWQiXSwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20vYXVkL2p3dGV4cDYwIiwianRpIjoiMDhkbFlFcDRMYUVZaTh1b1o3VWZpSDVLbk1pbE1JUjVnMlRhcVA5NDVxWVhvSGRpdXVxbGVNZWhEVGlOSGR5ZyJ9.0OxpVdfczaSTFIEUJmsG4a6U9_IbGBVFZO5N-uqv1FM",
    expires_in: 3599
  });
});

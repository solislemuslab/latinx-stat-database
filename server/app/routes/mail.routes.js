module.exports = (app) => {
  const mail = require("../controllers/mail.controller.js");
  var router = require("express").Router();

  // Send email
  router.put("/sendemail", mail.sendEmail);

  app.use("/api/mail", router);
};

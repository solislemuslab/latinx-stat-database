exports.sendEmail = (req, res) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'widlisd@gmail.com',
    from: 'widlisd@gmail.com',
    subject: 'APPROVAL REQUESTED',
    text: 'A new account has been created.',
  };

  sgMail
    .send(msg)
    .then(() => {
      res.send({
        message: "Email sent.",
      });
    })
    .catch((error) => {
      res.send({
        message: error,
      });
    })
};

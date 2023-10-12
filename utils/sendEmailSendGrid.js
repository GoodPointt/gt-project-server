const sgMail = require('@sendgrid/mail');

const sendEmail = async (data) => {
  sgMail.setApiKey(process.env.SG_API_KEY);

  await sgMail
    .send({ ...data, from: 'dev6012@meta.ua' })
    .then(() => {
      console.log('✅ Email sent successfully');
      return true;
    })
    .catch((error) => {
      console.log({ error });
    });
};

module.exports = sendEmail;

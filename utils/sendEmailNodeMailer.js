const nodemailer = require('nodemailer');

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: 'dev6012@meta.ua',
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const msg = {
  to: 'favojex177@sesxe.com',
  from: 'dev6012@meta.ua',
  subject: 'Welcome!',
  html: '<p>Please finish authorization by following link below. <a href="http://127.0.0.1:3333/auth/verify" target="_blank">Confirm registration!</a></p>',
};

transport
  .sendMail(msg)
  .then(() => console.log('Email sent successfully by nodemailer'))
  .catch((e) => console.log(e));

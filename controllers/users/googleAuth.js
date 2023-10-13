const queryString = require('querystring');
const URL = require('url');

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/api/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userifo.email',
      'https://www.googleapis.com/auth/userifo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  return res.redirect(
    `https://accounts.google.com/0/oauth2/v2/auth?${stringifiedParams}`
  );
};

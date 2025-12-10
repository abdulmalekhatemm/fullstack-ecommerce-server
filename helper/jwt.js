const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
  const secret = process.env.JSON_WEB_SECRET_KEY; // تأكد الاسم نفسه المستخدم في .env
  return jwt({
    secret: secret,
    algorithms: ['HS256'],
  });
}

module.exports = authJwt;

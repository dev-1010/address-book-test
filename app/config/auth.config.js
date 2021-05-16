// Secret token to sign the Jwt token
module.exports = {
  secret: process.env.TOKEN_AUTH_SECRET,
  saltRounds: process.env.SALT_ROUNDS
};

const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const query = require('../model/database');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * 
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 * 
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

/**
 * 
 * @param {*} password - The password string that the user inputs to the password field in the register form
 * 
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 * 
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}


/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user,id) {
  const expiresIn = '2m';
  const payload = {
    sub: {
      user : user ,
      id : id
    },
    iat: Date.now() / 1000,
  };
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
    iat: payload.iat
  }
}
function saveToken(user,token,id){
  return new Promise((resolve , reject) => {
    let startDate = new Date();
    let expireDate = new Date();
    expireDate.setDate(startDate.getDate() + 1);
    startDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
    expireDate = expireDate.toISOString().slice(0, 19).replace('T', ' ');

    let queryText = `INSERT INTO user_tokens VALUE('${user.email}','${token}','${startDate}','${expireDate}',1,'${id}');`;

    query(queryText)
    .then((result) => {
      resolve( result);
    })
    .catch((result) => {
      console.log("hi4");
      reject(result);
    });
  });
}
module.exports.saveToken = saveToken;
module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
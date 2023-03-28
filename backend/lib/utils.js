const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const query = require('../model/database');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');



function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}


function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}



function issueJWT(user) {
  const expiresIn = '2h';
  const payload = {
    sub: {
      user : user 
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
// function saveToken(user,token,id){
//   return new Promise((resolve , reject) => {
//     let startDate = new Date();
//     let expireDate = new Date();
//     expireDate.setDate(startDate.getDate() + 1);
//     startDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
//     expireDate = expireDate.toISOString().slice(0, 19).replace('T', ' ');

//     let queryText = `INSERT INTO user_tokens VALUE('${user.email}','${token}','${startDate}','${expireDate}',1,'${id}');`;

//     query(queryText)
//     .then((result) => {
//       resolve( result);
//     })
//     .catch((result) => {
//       reject(result);
//     });
//   });
// }
// module.exports.saveToken = saveToken;
module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
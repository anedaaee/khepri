const fs = require('fs');

const path = require('path');
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const query = require('../model/database');
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms : ['RS256']
};

const strategy = new JwtStrategy(options,(payload , done) => {
    try{
        let today = Date.now() / 1000;
        if( today > payload.exp){
            done(null,false,{message : 'token expired'});
        }else{
            done(null,payload.sub.user);
        }
    }catch(error){
        done(error,false);
    }
});

module.exports = (passport) => {
    passport.use(strategy);
}

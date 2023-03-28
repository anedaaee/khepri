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
    console.log(payload);
    let queryText = `SELECT * FROM user_tokens WHERE id = '${payload.sub.id}'`;
    query(queryText)
    .then( (result) => {
        if(result.data.lengh === 0){
            done(null,false);
        }else{
            
            let today = Date.now() / 1000;
            console.log(payload.exp);
            console.log(today);
            if( today > payload.exp){
                done(null,false,{message : 'token expired'});
            }else{
                done(null,result.data[0]);
            }
            // console.log(result.data[0].login_time + " "+today);
            //console.log(JSON.stringify(result.data[0]));
        }
    })
    .catch( (result) => {
        done(result,null);
    });
});

module.exports = (passport) => {
    //console.log(JSON.stringify(passport));
    passport.use(strategy);
}

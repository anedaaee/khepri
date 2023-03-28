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
    // console.log('hi');
    // let queryText = `SELECT * FROM user_tokens WHERE id = '${payload.sub.id}'`;
    // query(queryText)
    // .then( (result) => {
    //     if(result.data.lengh === 0){
    //         done(null,false);
    //     }else{
    //         console.log(result.data[0].login_status);
    //         if(result.data[0].login_status === 1){
    //             let today = Date.now() / 1000;
    //             console.log(today);
    //             console.log(payload.exp);
    //             if( today > payload.exp){
    //                 done(null,false,{message : 'token expired'});
    //             }else{
    //                 done(null,result.data[0]);
    //             }
    //         }else{
    //             done(null,false,{message : 'already loged out'});
    //         }
    //     }
    // })
    // .catch( (result) => {
    //     done(result,null);
    // });
});

module.exports = (passport) => {
    passport.use(strategy);
}

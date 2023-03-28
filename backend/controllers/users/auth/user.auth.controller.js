const utils = require('../../../lib/utils');
const query = require('../../../model/database');
class UserController{

    checkUserName = (email) => {
        return new Promise((resolve , reject) => {
            let queryText = `SELECT COUNT(email) FROM users WHERE email='${email}';`;
            query(queryText)
            .then((result) => {
                resolve(result);
            })
            .catch((result) => {
                reject(result);
            });
        });
    }

    signup = (req,res,next) => {
        this.userInformation = req.body;
        this.checkUserName(this.userInformation.email)
        .then( (result) => {
            //console.log(JSON.stringify(result));
            const saltHash = utils.genPassword(this.userInformation.password);
            
            let queryText = `insert into users value('${this.userInformation.email}'\
                            ,'${saltHash.hash}','${saltHash.salt}','${this.userInformation.fullName}'\
                            ,'${this.userInformation.signupDate}');`;
            query(queryText)
            .then((result) => {
                result.metadata.message = `user ${this.userInformation.email} successfuly signed up.`;
                res.status(202).send(JSON.stringify(result));
            })
            .catch ( (result) => {
                res.status(500).send(JSON.stringify(result));
            });
        })
        .catch( (result) => {
            result.metadata.message = `we already have email: ${this.userInformation.email} in our database`;
            res.status(406).send(JSON.stringify(result));
        });
        
    }
}

module.exports = UserController;
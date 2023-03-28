const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

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
            const saltHash = utils.genPassword(this.userInformation.password);
            
            let queryText = `INSERT INTO users VALUE('${this.userInformation.email}'\
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

    login = (req,res,next) => {
        this.userInformation = req.body;
        let queryText = `SELECT * FROM users WHERE email='${this.userInformation.email}';`;
        query(queryText)
        .then( (result) => {
            if(result.data.lengh === 0){
                let returnObj = {
                    metadata:{
                        situation:false,
                        message:`wrong information. `
                    },
                    data : {}
                };
                res.status(404).send(JSON.stringify(returnObj));
            }else{
                let user = result.data[0];
                let passwordValidation = utils.validPassword(this.userInformation.password , user.hash , user.salt);
                if(passwordValidation){
                    let id = uuidv4();
                    const jwt = utils.issueJWT(user,id);
                    utils.saveToken(user,jwt.token,id)
                    .then((result)=>{
                        let returnObj = {
                            metadata:{
                                situation:true,
                                message:`successfully loged in. `
                            },
                            data : {
                                success : true,
                                user : user ,
                                token : jwt.token ,
                                exiresIn : jwt.exiresIn
                            }
                        };
                        res.status(202).send(JSON.stringify(returnObj));
                    })
                    .catch((result)=>{
                        let returnObj = {
                            metadata:{
                                situation:false,
                                message:`error accured when saving token data. `
                            },
                            data : {}
                        };
                        console.log(JSON.stringify(result));
                        res.status(500).send(JSON.stringify(returnObj));
                    });
                }else{
                    let returnObj = {
                        metadata:{
                            situation:false,
                            message:`wrong information. `
                        },
                        data : {}
                    };
                    res.status(404).send(JSON.stringify(returnObj)); 
                }
            }
        })
        .catch( (result) => {
            res.status(500).send(JSON.stringify(result));
        });
    }
}

module.exports = UserController;
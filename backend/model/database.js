const mysql = require('mysql');

require('dotenv').config();


const config = {
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}
let  query = (query) => {
    return new Promise( (resolve , reject) => {
        let connection = mysql.createConnection(config);
        try{
            connection.connect();
            {
            connection.query(query,(error,result,fields) => {
                if(error){
                    let returnObj = {
                        metadata:{
                            situation:false,
                            message:`Database performed query.`,
                            error:error
                        },
                        data : {}
                    };
                    reject(returnObj);
                }else{
                    let returnObj = {
                        metadata:{
                            situation:true,
                            message:`Query successfuly performed`,
                        },
                        data : result
                    };
                    resolve(returnObj);
                }
            });
        }
        }catch(error){
           let returnObj = {
                metadata:{
                    situation:false,
                    message:`Database connection failed.`,
                    error:error
                },
                data : {}
            };
            reject (returnObj); 
        }

    });
}
module.exports = query;

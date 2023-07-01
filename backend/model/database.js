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
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        }
        }catch(error){
            reject (error); 
        }

    });
}
module.exports = query;

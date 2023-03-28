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
            let returnObj = {
                metadata:{
                    situation:true,
                    message:'successfuly connect to database'
                },
                data : {}
            };
            //resolve (returnObj);
            {
            console.log(query);
            //console.log(connection);
            connection.query(query,(error,result,fields) => {
                if(error){
                    let returnObj = {
                        metadata:{
                            situation:true,
                            message:`Database performed query. error: ${error}`
                        },
                        data : {}
                    };
                    reject(returnObj);
                }else{
                    let returnObj = {
                        metadata:{
                            situation:true,
                            message:`Query successfuly performed`
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
                    message:`Database connection failed. error: ${err}`
                },
                data : {}
            };
            reject (returnObj); 
        }

    });
}
module.exports = query;
//let DataBase = {};
// let connection = mysql.createConnection(config);
// connection.connect((error) => {
//     if(error){
//         console.log(error);
//     }else{
//         console.log(`db connected`);
//     }
// });

// DataBase.query = (query) => {
//     console.log(query);
//     console.log(connection);
//     connection.query(query,(error,result,fields) => {
//         if(error){
//             let returnObj = {
//                 metadata:{
//                     situation:true,
//                     message:`Query successfuly performed`
//                 },
//                 data : result
//             };
//             return(returnObj);
//         }else{
//             let returnObj = {
//                 metadata:{
//                     situation:false,
//                     message:`Database performed query. error: ${error}`
//                 },
//                 data : {}
//             };
//             return(returnObj);
//         }
//     });
// }
//module.exports = DataBase;
// class Database {
//      connection

//     setConnection()  {
//         return new Promise((resolve , reject) => {
//             this.connection = mysql.createConnection(config);
//             this.connection.connect((err)=>{
//                 if(err){
//                     let returnObj = {
//                         metadata:{
//                             situation:false,
//                             message:`Database connection failed. error: ${err}`
//                         },
//                         data : {}
//                     };
//                     reject (returnObj);
//                 }else{
//                     let returnObj = {
//                         metadata:{
//                             situation:true,
//                             message:'successfuly connect to database'
//                         },
//                         data : {}
//                     };
//                     resolve (returnObj);
//                     //console.log(this.connection);
//                 }
//             });
//         });
//     }
//      query(query){
//         console.log(query);
//         console.log(this.connection);
//         this.connection.query(query,(error,result,fields) => {
//             if(error){
//                 let returnObj = {
//                     metadata:{
//                         situation:true,
//                         message:`Query successfuly performed`
//                     },
//                     data : result
//                 };
//                 return(returnObj);
//             }else{
//                 let returnObj = {
//                     metadata:{
//                         situation:false,
//                         message:`Database performed query. error: ${error}`
//                     },
//                     data : {}
//                 };
//                 return(returnObj);
//             }
//         });
//     }
// }

// module.exports = Database;
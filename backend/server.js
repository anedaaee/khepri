const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const passport = require('passport');

//const Database = require('./model/database');
const userAuthRouter = require('./routers/users/auth/router.user.atuh');
const stockRouter = require('./routers/stock/stock.router');

require('dotenv').config();
require('./config/passport')(passport);
const server = express();

server.use(passport.initialize());
server.use(express.json());
server.use(express.urlencoded({ extended : false }));
server.use(helmet());
server.use(cors());

server.use('/api/users/auth',userAuthRouter);
server.use('/api/stock',stockRouter);

server.listen(process.env.PORT || 7170 , ()=>{
    console.log(`server is running on port ${process.env.PORT || 7170}`);
    // let database = new Database();
    // let result = database.setConnection()
    // .then((result)=>{
    //     console.log(result.metadata.message);
    // })
    // .catch((result) => {
    //     if(!result.metadata.situation){
    //         console.log(result.metadata.message);
    //         process.exit();
    //     }
    // });
});
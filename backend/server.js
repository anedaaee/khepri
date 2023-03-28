const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const passport = require('passport');

//const Database = require('./model/database');
const userAuthRouter = require('./routers/users/auth/router.user.atuh');
const stockRouter = require('./routers/stock/stock.router');
const stockInProfileRouter = require('./routers/users/stockInProfile/router.user.stockInProfile');
const serverUsageRouter = require('./routers/admin/serverStatus/router.admin.serverStatus');

require('dotenv').config();
require('./config/passport')(passport);

const server = express();

server.use(passport.initialize());
server.use(express.json());
server.use(express.urlencoded({ extended : false }));
server.use(helmet());
server.use(cors());

server.use('/api/users/auth',userAuthRouter);
server.use('/api/users/stockInProfile' ,stockInProfileRouter);
server.use('/api/stock',stockRouter);
server.use('/api/admin/serverStatus',serverUsageRouter);

server.listen(process.env.PORT || 7170 , ()=>{
    console.log(`server is running on port ${process.env.PORT || 7170}`);
});
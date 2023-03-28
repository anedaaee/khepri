const express = require('express');
const passport = require('passport');

const StockInProfile = require('../../../controllers/users/stockInProfile/use.stockInProfile.controller');
const stockInProfile = new StockInProfile();

const router = express.Router();

router.post('/checkStockExistInProfile',passport.authenticate('jwt' , {session : false}),stockInProfile.checkStockExistInProfile);
router.post('/addStockToProfile',passport.authenticate('jwt' , {session : false}),stockInProfile.addStockToProfile);
router.post('/getStocksInProfileData',passport.authenticate('jwt' , {session : false}),stockInProfile.getStocksInProfileData);
router.post('/deleteStockInProfile',passport.authenticate('jwt' , {session : false}),stockInProfile.deleteStockInProfile);

module.exports = router ;
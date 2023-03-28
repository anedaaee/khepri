const express = require('express');
const passport = require('passport');

const StockController = require('../../controllers/stock/stock.controller');
const stockController = new StockController();


const router = express.Router();

router.post('/getStockDataWithDateRange',passport.authenticate('jwt' , {session : false}),stockController.getStockDataWithDateRange);
router.post('/getAllStockInformation',passport.authenticate('jwt' , {session : false}),stockController.getAllStockInformation);
router.post('/searchStock',passport.authenticate('jwt' , {session : false}),stockController.searchStock);

module.exports = router;
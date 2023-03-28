const { response } = require('express');
const query = require('../../../model/database');

class StockInProfileController{
    
    checkStockExistInProfile(req,res,next){
        let queryText = `SELECT * FROM stock_in_profile WHERE email='${req.body.email}' AND stock_symbol='${req.body.stockSymbol}';`;
        query(queryText)
        .then((result) => {
            res.status(200).send(JSON.stringify(result));
        })
        .catch((error) => {
            res.status(500).send(JSON.stringify(error));
        });
    }
    addStockToProfile(req,res,next){
        let queryText = `INSERT INTO stock_in_profile VALUES('${req.body.email}' , '${req.body.stockSymbol}');`;
        query(queryText)
        .then((result) => {
            res.status(200).send(JSON.stringify(result));
        })
        .catch((error) => {
            res.status(500).send(JSON.stringify(error));
        });
    }
    getStocksInProfileData(req,res,next){
        let queryText = `SELECT * FROM stock_in_profile WHERE email = '${req.body.email}';`;
        query(queryText)
        .then((result) => {
            res.status(200).send(JSON.stringify(result));
        })
        .catch((error) => {
            res.status(500).send(JSON.stringify(error));
        });
    }
    deleteStockInProfile(req,res,next){
        let queryText = `DELETE FROM stock_in_profile WHERE email='${req.body.email}' AND stock_symbol = '${req.body.stockSymbol}';`;
        query(queryText)
        .then((result) => {
            res.status(200).send(JSON.stringify(result));
        })
        .catch((error) => {
            res.status(500).send(JSON.stringify(error));
        });
    }
}

module.exports = StockInProfileController;
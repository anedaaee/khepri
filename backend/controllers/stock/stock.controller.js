const query = require('../../model/database');
const readCSV = require('./stockInformation/readCSV');
class StockController  {
    
    getStockDataWithDateRange(req,res,next){
        let queryText = `select * from ${req.body.stockName} where date >= \
                                       '${String(req.body.startDate)}' and date <= \
                                       '${String(req.body.finishDate)}';`;   
        query(queryText)
        .then((result) => {
            res.status(200).send(JSON.stringify(result));
        })
        .catch((error) => {
            res.status(500).send(JSON.stringify(error));
        })
    }

    getAllStockInformation(req,res,next){
        try{
            readCSV( (stockInformation) => {
                let returnObj = {
                    metadata:{
                        situation:true,
                        message:`successfuly read stocks information from csv file,`
                    },
                    data : stockInformation
                };
                res.status(200).send(JSON.stringify(returnObj));
            });
        }catch(error){
            let returnObj = {
                metadata:{
                    situation:false,
                    message:`there is error to all stock information data file`,
                    error:error
                },
                data : {}
            };
            res.send.status(500).send(JSON.stringify(returnObj));
        }
    }
    searchStock(req,res,next) {
        try{
            let searchString = req.body.searchString.toLowerCase();

            if(searchString === ''){
                let returnObj = {
                    metadata:{
                        situation:false,
                        message:`empty input`
                    },
                    data : {}
                };
                res.status(406).send(JSON.stringify(returnObj));
            }else{
                readCSV( (stockInformation) => {
                    let returnValue = [];
                    for (let stock of stockInformation){
                        //if stock name or symbol has the input string
                        if(String(stock.symbol.toLowerCase()).search(searchString) != -1 || String(stock.name.toLowerCase()).search(searchString) != -1){
                            //add stock info to return value arraye which means that it have the input string
                            returnValue.push(stock);    
                        }
                    }
                    //if return value array lengh is 0 shows that we couldnt finde the input string
                    if(returnValue.length == 0){
                        let returnObj = {
                            metadata:{
                                situation:false,
                                message:`nothing find.`
                            },
                            data : {}
                        }
                        res.status(400).send(JSON.stringify(returnObj));
                    }else{
                        let returnObj = {
                            metadata:{
                                situation:true,
                                message:`search successfuly complete.`
                            },
                            data : returnValue
                        }
                        res.status(200).send(JSON.stringify(returnObj));
                    }
                });
            }
        }catch(error){
            let returnObj = {
                metadata:{
                    situation:false,
                    message:`there is error to search stock information.`,
                    error:error.toString()
                },
                data : {}
            };
            res.status(500).send(JSON.stringify(returnObj));
        }
    }
}

module.exports = StockController;
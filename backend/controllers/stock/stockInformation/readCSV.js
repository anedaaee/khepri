const fs = require("fs");
const { parse } = require("csv-parse");

module.exports =  function readCSV(result){
  let allStockInfo = []; 
  fs.createReadStream("db_list.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    let stockInfo = {
      symbol: String (row[0]),
      name: String(row[1]),
    }
    allStockInfo.push(stockInfo);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    result(allStockInfo);
  });
  
}



const cpuParameter = require('./cpuParameter/cpuAverage');
const os = require('os');
const process = require('process');

class serverStatus {

    serverUsage(req,res,next){
        try{
            cpuParameter.findCPUUsage((cpuUsage) => {
                let memoryUsage = 100 - ~~(100 * os.freemem / os.totalmem); //calculate our memory usage with os module
                let result; // is true when our memory usage and cpu usage is less than 90% and returm false otherwise
                if(cpuUsage > 90 || memoryUsage > 90){
                    result = false; 
                }else{
                    result = true;
                }
                if(result){
                    let returnObj = {
                        metadata:{
                            situation:result,
                            message:`cpu usage.`
                        },
                        data : {
                            cpuUsage: cpuUsage,
                            memoryUsage: memoryUsage
                        }
                    };
                    res.status(200).send(JSON.stringify(returnObj)); 
                }else{
                    let returnObj = {
                        metadata:{
                            situation:false,
                            message:`high usage.`
                        },
                        data : {}
                    };
                    res.status(502).send(JSON.stringify(returnObj));
                }
            });
        }catch(error){
            let returnObj = {
                metadata:{
                    situation:false,
                    message:`there is error to get server usage status.`,
                    error:error.toString()
                },
                data : {}
            };
            res.status(500).send(JSON.stringify(returnObj));
        }
    }

}

module.exports = serverStatus;
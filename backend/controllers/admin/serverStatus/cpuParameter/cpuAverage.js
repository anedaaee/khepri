var os = require("os");

function findCPUUsage(callback){
  //Create function to get CPU information
  function cpuAverage() {

    //Initialise sum of idle and time of cores and fetch CPU info
    let totalIdle = 0, totalTick = 0;
    let cpus = os.cpus();

    //Loop through CPU cores
    for(var i = 0, len = cpus.length; i < len; i++) {

      //Select CPU core
      let cpu = cpus[i];

      //Total up the time in the cores tick
      for(type in cpu.times) {
        totalTick += cpu.times[type];
    }     

      //Total up the idle time of the core
      totalIdle += cpu.times.idle;
    }

    //Return the average Idle and Tick times
    return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
  }

  //Grab first CPU Measure
  let startMeasure = cpuAverage();

  //Set delay for second Measure
  setTimeout(function() { 

    //Grab second Measure
    let endMeasure = cpuAverage(); 

    //Calculate the difference in idle and total time between the measures
    let idleDifference = endMeasure.idle - startMeasure.idle;
    let totalDifference = endMeasure.total - startMeasure.total;

    //Calculate the average percentage CPU usage
    let percentageCPU = 100 - ~~(100* idleDifference / totalDifference);
    
    return callback(percentageCPU);

  }, 100);
}



module.exports.findCPUUsage =  findCPUUsage;

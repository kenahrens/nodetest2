var newrelic = require('newrelic');
var profiler = require('gc-profiler');

// Memory usage via custom event
if (process.memoryUsage) {
  console.log('Memory Usage Profiler Enabled');
  setInterval(function sampleMemory() {
    var stats = process.memoryUsage();
    stats.pid = process.pid;
    newrelic.recordCustomEvent('NodeMemory', stats);
  }, 5000);
} else {
  console.log('Memory usage available only in Node 0.1+, this is running: ' + process.version);
}

// CPU usage via custom event
if (process.cpuUsage) {
  console.log('CPU Usage Profiler Enabled');

  // sampling interval in milliseconds
  var interval = 60000;
  var lastUsage;

  setInterval(function sampleCpu() {
    // get CPU usage since the process started
    var usage = process.cpuUsage();

    if (lastUsage) {
      // calculate percentage
      var intervalInMicros = interval * 1000;
      var userPercent = ((usage.user - lastUsage.user) / intervalInMicros) * 100;
      newrelic.recordCustomEvent('NodeCPU', { userPercent: userPercent, pid: process.pid });
    }

    lastUsage = usage;
  }, interval)
} else {
  console.log('CPU usage available only in Node 6.1/0+, this is running: ' + process.version);
}

// GC profiling via custom events
profiler.on('gc', function (info) {
  info.pid = process.pid;
  info.timestamp = info.date.getTime();
  delete info.date;
  newrelic.recordMetric('Custom/GC/' + info.type, info.duration / 1000);
  newrelic.recordCustomEvent('NodeGC', info);
});
console.log('GC Profiler Enabled');

// // CPU usage via custom metric
// if (process.cpuUsage) {
  
//   // Invoke sampler immediately at startup, then every 30 seconds
//   console.log('CPU Profiler Enabled');
//   var cpuPoller = pollCpu(newrelic.agent);
//   cpuPoller();
//   // setInterval(cpuPoller, 5000);
//   setInterval(cpuPoller, 60000);
// } else {
//   console.log('CPU usage available only in Node 6.1/0+, this is running: ' + process.version);
// }

// // Helper function to get the CPU Usage
// function pollCpu(agent) {
//   var lastCpu;
//   return function cpuSampler() {
//     try {
      
//       // Get the current usage and subtract the last usage
//       var currCpu = process.cpuUsage();
//       var userCpuInSec = (lastCpu ? (currCpu.user - lastCpu.user) : currCpu.user) / 1e6;
//       var systemCpuInSec = (lastCpu ? (currCpu.system - lastCpu.system) : currCpu.system) / 1e6;

//       // Store the CPU User and System times into metrics
//       var statsUser = agent.metrics.getOrCreateMetric('CPU/User Time');
//       statsUser.recordValue(userCpuInSec);
//       var statsSystem = agent.metrics.getOrCreateMetric('CPU/System Time');
//       statsSystem.recordValue(systemCpuInSec);

//       // Store the entire measurement as a custom event in Insights
//       currCpu.pid = process.pid;
//       currCpu.userCpu = userCpuInSec;
//       currCpu.systemCpu = systemCpuInSec;
//       newrelic.recordCustomEvent('NodeCPU', currCpu);
      
//       // Backup the last value we'll need for the next reading
//       lastCpu = currCpu;
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }
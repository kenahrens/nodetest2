var newrelic = require('newrelic');
var profiler = require('gc-profiler');

// Memory profiling via custom events
profiler.on('gc', function (info) {
  info.pid = process.pid;
  info.timestamp = info.date.getTime();
  delete info.date;
  newrelic.recordMetric('Custom/GC/' + info.type, info.duration / 1000);
  newrelic.recordCustomEvent('NodeGC', info);
});
console.log('Memory Profiler Enabled');

// CPU usage via custom metric
if (process.cpuUsage) {
  
  // Invoke sampler immediately at startup, then every 30 seconds
  console.log('CPU Profiler Enabled');
  var cpuPoller = pollCpu(newrelic.agent);
  cpuPoller();
  // setInterval(cpuPoller, 5000);
  setInterval(cpuPoller, 60000);
} else {
  console.log('CPU usage available only in Node 6.1/0+, this is running: ' + process.version);
}

// Helper function to get the CPU Usage
var lastCpuValue;
function pollCpu(agent) {
  return function cpuSampler() {
    try {
      
      // Get the current usage and subtract the last usage
      var currentCpuValue = process.cpuUsage();
      if (lastCpuValue != null) {
        currentCpuValue.user = currentCpuValue.user - lastCpuValue.user;
        currentCpuValue.system = currentCpuValue.system - lastCpuValue.system;
      }

      // Normalize the User and System CPU values
      var statsUser = agent.metrics.getOrCreateMetric('CPU/User Time');
      currentCpuValue.userCpu = currentCpuValue.user /= 1e6;
      statsUser.recordValue(currentCpuValue.userCpu);
      var statsSystem = agent.metrics.getOrCreateMetric('CPU/System Time');
      currentCpuValue.systemCpu = currentCpuValue.system / 1e6;
      statsSystem.recordValue(currentCpuValue.systemCpu);

      // Save the metrics into Insights
      currentCpuValue.pid = process.pid;
      newrelic.recordCustomEvent('NodeCPU', currentCpuValue);
      
      // Backup the last value we'll need for the next reading
      lastCpuValue = currentCpuValue;
    } catch (e) {
      console.log(e);
    }
  }
}
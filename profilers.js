var newrelic = require('newrelic');
var profiler = require('gc-profiler');

// Memory profiling via custom events
profiler.on('gc', function (info) {
  info.pid = process.pid;
  info.timestamp = info.date.getTime();
  delete info.date;
  newrelic.recordMetric('Custom/GC/' + info.type, info.duration / 1000);
  newrelic.recordCustomEvent('GC', info);
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
      var cpu = process.cpuUsage(lastCpuValue);
      var userCpuUsageInSeconds = cpu.user / 1e6;
      var stats = agent.metrics.getOrCreateMetric('CPU/User Time');
      stats.recordValue(userCpuUsageInSeconds);
      // console.log('Recording CPU value: ' + userCpuUsageInSeconds);
      lastCpuValue = cpu;
    } catch (e) {
      console.log(e);
    }
  }
}
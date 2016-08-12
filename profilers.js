var newrelic = require('newrelic');
var profiler = require('gc-profiler');

// Memory profiling via custom events
profiler.on('gc', function (info) {
  newrelic.recordMetric('Custom/GC', info.duration / 1000)
  newrelic.recordCustomEvent('GC', info)
});
console.log('Memory Profiler Enabled');

// CPU usage via custom metric
if (process.cpuUsage) {
  
  // Invoke sampler immediately at startup, then every 30 seconds
  console.log('CPU Profiler Enabled');
  var cpuPoller = pollCpu(newrelic.agent);
  cpuPoller();
  setInterval(cpuPoller, 30000);
} else {
  console.log('CPU usage available only in Node 6+, this is running: ' + process.version);
}

// Helper function to get the CPU Usage
function pollCpu(agent) {
  var lastSample;
  return function cpuSampler() {
    try {
      var cpu = process.cpuUsage(lastSample);
      var userCpuUsageInSeconds = cpu.user / 1e6;
      var stats = agent.metrics.getOrCreateMetric('CPU/User Time');
      stats.recordValue(userCpuUsageInSeconds);
      lastSample = cpu;
    } catch (e) {
      console.log(e);
    }
  }
}
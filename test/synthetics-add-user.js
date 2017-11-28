/** CONFIGURATIONS **/

const faker = require('faker');

// Setup the data for the fake user
var fname = faker.name.firstName();
var lname = faker.name.lastName();
var username = faker.internet.userName();
var useremail = faker.internet.email();
var addstreet = faker.address.streetAddress();
var addcity = faker.address.city();
var addstate = faker.address.stateAbbr();
var addzip = faker.address.zipCode();

// Theshold for duration of entire script - fails test if script lasts longer than X (in ms)
// Script-wide timeout for all wait and waitAndFind functions (in ms)
var DefaultTimeout = 60000;
// Change to any User Agent you want to use.
// Leave as "default" or empty to use the Synthetics default.
var UserAgent = "default";

/** HELPER VARIABLES AND FUNCTIONS **/

var assert = require('assert'),
  By = $driver.By,
  browser = $browser.manage(),
  startTime = Date.now(),
  stepStartTime = Date.now(),
  prevMsg = '',
  prevStep = 0,
  lastStep = 9999,
VARS = {};
// Uncomment and use this if you're running Se-Builder 2 and used Manual Entry variables.
// If you don't know what those are, fuggedaboutit!
// VARS = {{scriptManualEntryData}};

var log = function(thisStep, thisMsg) {
  if (thisStep > 1 || thisStep == lastStep) {
    var totalTimeElapsed = Date.now() - startTime;
    var prevStepTimeElapsed = totalTimeElapsed - stepStartTime;
    console.log('Step ' + prevStep + ': ' + prevMsg + ' FINISHED. It took ' + prevStepTimeElapsed + 'ms to complete.');
    $util.insights.set('Step ' + prevStep + ': ' + prevMsg, prevStepTimeElapsed);
    if (DefaultTimeout > 0 && totalTimeElapsed > DefaultTimeout) {
      throw new Error('Script timed out. ' + totalTimeElapsed + 'ms is longer than script timeout threshold of ' + DefaultTimeout + 'ms.');
    }
  }
  if (thisStep > 0 && thisStep != lastStep) {
    stepStartTime = Date.now() - startTime;
    console.log('Step ' + thisStep + ': ' + thisMsg + ' STARTED at ' + stepStartTime + 'ms.');
    prevMsg = thisMsg;
    prevStep = thisStep;
  }
};

/** BEGINNING OF SCRIPT **/

console.log('Starting synthetics script: nodetest2');
console.log('Default timeout is set to ' + (DefaultTimeout/1000) + ' seconds');
console.log('Variables set in this script: ', VARS);

// Setting User Agent is not then-able, so we do this first (if defined and not default)
if (UserAgent && (0 !== UserAgent.trim().length) && (UserAgent != 'default')) {
  $browser.addHeader('User-Agent', UserAgent);
  console.log('Setting User-Agent to ' + UserAgent);
}

// Get browser capabilities and do nothing with it, so that we start with a then-able command
$browser.getCapabilities().then(function () { })

// Step 1
.then(function() {
  log(1, '$browser.get("http://ec2-34-229-46-230.compute-1.amazonaws.com:3000/")');
  return $browser.get("http://ec2-34-229-46-230.compute-1.amazonaws.com:3000/"); })

// Step 2
.then(function() {
  log(2, 'clickElement "Create a New User"');
  return $browser.waitForAndFindElement(By.linkText("Create a New User"), DefaultTimeout); })
.then(function (el) { el.click(); })

// Step 3
.then(function() {
  log(3, 'setElementText "inputFirstName"');
  return $browser.waitForAndFindElement(By.id("inputFirstName"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys(fname); })

// Step 4
.then(function() {
  log(4, 'setElementText "inputLastName"');
  return $browser.waitForAndFindElement(By.id("inputLastName"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys(lname); })

// Step 5
.then(function() {
  log(5, 'setElementText "inputUserName"');
  return $browser.waitForAndFindElement(By.id("inputUserName"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys(username); })

// Step 6
.then(function() {
  log(6, 'setElementText "inputUserEmail"');
  return $browser.waitForAndFindElement(By.id("inputUserEmail"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys(useremail); })

// Step 7
.then(function() {
  log(7, 'setElementText "inputAddStreet"');
  return $browser.waitForAndFindElement(By.id("inputAddStreet"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys(addstreet); })

// Step 8
.then(function() {
  log(8, 'setElementText "inputAddCity"');
  return $browser.waitForAndFindElement(By.id("inputAddCity"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys(addcity); })

// Step 9
.then(function() {
  log(9, 'setElementText "inputAddState"');
  return $browser.waitForAndFindElement(By.id("inputAddState"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys(addstate); })

// Step 10
.then(function() {
  log(10, 'setElementText "inputAddZip"');
  return $browser.waitForAndFindElement(By.id("inputAddZip"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys(addzip); })

// Step 11
.then(function() {
  log(11, 'clickElement "btnSubmit"');
  return $browser.waitForAndFindElement(By.id("btnSubmit"), DefaultTimeout); })
.then(function (el) { el.click(); })

// Step 12
.then(function() {
  log(12, '$browser.get("http://ec2-34-229-46-230.compute-1.amazonaws.com:3000/")');
  return $browser.get("http://ec2-34-229-46-230.compute-1.amazonaws.com:3000/"); })

// Step 13
.then(function() {
  log(13, 'clickElement "Get a List of Users"');
  return $browser.waitForAndFindElement(By.linkText("Get a List of Users"), DefaultTimeout); })
.then(function (el) { el.click(); })

// Step 14
.then(function() {
  log(14, '$browser.get("http://ec2-34-229-46-230.compute-1.amazonaws.com:3000/")');
  return $browser.get("http://ec2-34-229-46-230.compute-1.amazonaws.com:3000/"); })

// Step 15
.then(function() {
  log(15, 'clickElement "Search for a User"');
  return $browser.waitForAndFindElement(By.linkText("Search for a User"), DefaultTimeout); })
.then(function (el) { el.click(); })

// Step 16
.then(function() {
  log(16, 'setElementText "inputQuery"');
  return $browser.waitForAndFindElement(By.id("inputQuery"), DefaultTimeout); })
.then(function (el) {
  el.clear();
  el.sendKeys(username); })

// Step 17
.then(function() {
  log(17, 'clickElement "btnSubmit"');
  return $browser.waitForAndFindElement(By.id("btnSubmit"), DefaultTimeout); })
.then(function (el) { el.click(); })

.then(function() {
  log(lastStep, '');
  console.log('Browser script execution SUCCEEDED.');
}, function(err) {
  console.log ('Browser script execution FAILED.');
  throw(err);
});

/** END OF SCRIPT **/

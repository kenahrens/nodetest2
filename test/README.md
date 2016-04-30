# Tests

## Functional Tests

* loadserver.js - basic test to load express
* user.js - user add and list tests

## Gatling Load Scenario

ExpressDemo.scala is a [gatling.io](http://gatling.io) load test. You can run it like this:

```
GATLING_HOME/gatling.sh -nr -sf test/ -s ExpressDemo
```

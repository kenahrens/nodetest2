# Tutorial: nodetest2

[![Build Status](https://travis-ci.org/kenahrens/nodetest2.svg?branch=master)](https://travis-ci.org/kenahrens/nodetest2)

This is a demo app that includes a basic Express app with MongoDB backend.

## Running and Testing

Note: this app requires MongoDB is running on the default ports.

You can run with ```npm start``` or just run the tests with ```npm test```

There are also some load tests, if you use PM2 then you can launch the app and the tests both with PM2.

```
$ pm2 start ./bin/www -i 2
...
$ pm2 start ./test/load/load.js
...
$ pm2 list
┌──────────┬────┬─────────┬───────┬────────┬─────────┬────────┬──────────────┬──────────┐
│ App name │ id │ mode    │ pid   │ status │ restart │ uptime │ memory       │ watching │
├──────────┼────┼─────────┼───────┼────────┼─────────┼────────┼──────────────┼──────────┤
│ load     │ 3  │ fork    │ 25250 │ online │ 0       │ 14h    │ 39.105 MB    │ disabled │
│ www      │ 6  │ cluster │ 24963 │ online │ 0       │ 14h    │ 142.559 MB   │ disabled │
│ www      │ 7  │ cluster │ 24968 │ online │ 0       │ 14h    │ 166.367 MB   │ disabled │
└──────────┴────┴─────────┴───────┴────────┴─────────┴────────┴──────────────┴──────────┘
```

## Overview

Primary libraries used:
* express - for web and api framework
* jade - UI templates
* mongodb - native db calls
* request - api client calls to backends
 
Testing via:
* mocha - test framework
* superagent - HTTP testing tools
* faker - generate fake test data

Monitoring via:
* morgan - logging
* newrelic - performance monitoring

## 

## New Relic Setup

If you want to monitor this app with New Relic, you need to modify newrelic.js or set the proper environment variables:
* NEW_RELIC_APP_NAME
* NEW_RELIC_LICENSE_KEY

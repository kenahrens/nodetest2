# Tutorial: nodetest2

[![Build Status](https://travis-ci.org/kenahrens/nodetest2.svg?branch=master)](https://travis-ci.org/kenahrens/nodetest2)

This Node + Mongo tutorial is loosely based on this [blog](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).

Primary libraries used:
* express
* mongodb
* jade
 
Testing via:
* mocha - test framework
* superagent - HTTP testing tools
* faker - generate fake test data

Monitoring via:
* morgan - logging
* newrelic - performance monitoring

## New Relic Setup

If you want to monitor this app with New Relic, you need to modify newrelic.js or set the proper environment variables:
* NEW_RELIC_APP_NAME
* NEW_RELIC_LICENSE_KEY

#!/usr/bin/env node

/**
 * Example daily task using npm dependencies
 */

const moment = require('moment');
const fs = require('fs');

console.log('Running daily task at:', moment().format('YYYY-MM-DD HH:mm:ss'));

// Example task that uses a dependency
const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
const summary = `Daily report for ${yesterday}\n`;

fs.appendFileSync('/var/log/daily-report.log', summary);
console.log('Daily task completed');
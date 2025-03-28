#!/usr/bin/env node

/**
 * Example Node.js cron script
 * This script can be scheduled in a crontab file
 */

console.log('Running Node.js cron task at:', new Date().toISOString());

// Example task: write data to a file
const fs = require('fs');
const logFile = '/var/log/node-cron.log';

fs.appendFileSync(
  logFile, 
  `Task executed at ${new Date().toISOString()}\n`
);

console.log('Task completed successfully');
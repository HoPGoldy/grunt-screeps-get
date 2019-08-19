/*
 * grunt-screeps-get
 * https://github.com/HoPGoldy/grunt-screeps-get
 *
 * Copyright (c) 2019 hopgoldy
 * Licensed under the MIT license.
 */

'use strict';

const fs = require('fs');
const https = require('https');

module.exports = function(grunt) {
  grunt.registerMultiTask('screeps-get', 'A Grunt plugin for pull code from your Screeps account', function() {
    const done = this.async();
    const options = this.options({});
    // 生成请求路径
    const requestPath = (options.ptr ? '/ptr/api/user/code' : '/api/user/code') + `?branch=${options.branch || 'default'}`;
    // 生成保存文件夹
    const saveDir = this.data.saveDir;
    // 组装请求 options
    const requestOptions = {
      hostname: 'screeps.com',
      port: 443,
      path: requestPath,
      method: 'GET',
      auth: `${options.email}:${options.password}`
    };

    const req = https.request(requestOptions, res => {
      res.setEncoding('utf8');
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        data = JSON.parse(data)
        // 错误处理
        if (!data.ok) return console.error('Error while pulling from Screeps.\n', data); 
        
        // 新建文件夹
        if (!fs.existsSync(saveDir)) {
          fs.mkdirSync(saveDir);
        }

        // 创建文件
        for (const moduleName in data.modules) {
          fs.writeFileSync(`${saveDir}/${moduleName}.js`, data.modules[moduleName], err => {
            if (err) return console.log('Error with writeFile ', err);
          });
        }
        done();
      })
    })

    req.on('error', e => console.error(`Error with request: ${e.message}`));
    req.end();
  });
};

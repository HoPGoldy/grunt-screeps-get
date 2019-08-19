# grunt-screeps-get

> A Grunt plugin for pull code from your Screeps account

## Dependence

- Grunt `~0.4.5`
- node `>=8`


## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-screeps-get --save-dev
```

## Usage Example

**Gruntfile.js:**

```js
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps-get');

    grunt.initConfig({
        'screeps-get': {
            default: {
                options: {
                    email: 'YOUR_EMAIL',
                    password: 'YOUR_PASSWORD',
                    branch: 'default',
                    ptr: false
                },
                saveDir: 'src/'
            }
        }
    });
}
```

Now you can pull code to the folder `src/` from your Screeps account with following command:

```
grunt screeps-get
```

## Problem

This plugin does not support recognizing `warm` files, all files will be interpreted as `js` files.

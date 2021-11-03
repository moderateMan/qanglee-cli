#!/usr/bin/env node --harmony
'use strict'
process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

program.version(require('../package').version)
program.usage('<command>')


program
    .command('create')
    .description('create a Moderate project')
    .alias('c')
    .action(() => {
        require('../command/init.js')()
    })

program.parse(process.argv)


if (program.args.length) {
    program.help()
}
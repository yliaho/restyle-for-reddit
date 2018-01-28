const mocha = require('mocha')
const { expect } = require('chai')
const path = require('path')
const { exec } = require('child_process')
const Restyle = require('../bin/restyle').isDev

const cwd = process.cwd()
const command = `node ${path.resolve(__dirname, '../bin/restyle')} publish`

describe('Restyle', function() {
  it('Should Not Throw an Error', () => {
    expect(
      exec(command, {}, (error, stdout, stderr) => {
        if (error) throw Error(error)

        console.log(stdout)
        console.log(stderr)
      })
    ).to.not.throw
  })
})

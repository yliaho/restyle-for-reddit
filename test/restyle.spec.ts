///<reference path="../bin/src/typings.d.ts"/>

import { expect } from 'chai'
import * as path from 'path'
import { exec } from 'child_process'
import { isDev } from '../bin/src/Restyle'
import { testFunc } from '../bin/src'
import 'mocha'

const command = `node ${path.resolve(__dirname, '../bin/restyle')} watch`

describe('Restyle', function() {
  it('Should do stuff', () => {
    expect(testFunc()).to.equal('hello')
  })

  it('Should Not Throw an Error', () => {
    expect(
      exec(command, {}, (error, stdout, stderr) => {
        if (error) throw Error(error as any)

        console.log(stdout)
        console.log(stderr)
      })
    ).to.not.throw
  })
})

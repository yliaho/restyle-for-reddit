///<reference path="../bin/src/typings.d.ts"/>
///<reference types="@types/snoowrap"/>

import { expect } from 'chai'
import * as path from 'path'
import { exec } from 'child_process'
import Restyle from '../bin/src/Restyle'
import RedditConnection from '../bin/src/RedditConnection'
import { testFunc } from '../bin/src'
import * as snoowrap from 'snoowrap'
import 'mocha'

const command = `node ${path.resolve(__dirname, '../bin/restyle')} watch`

describe('Restyle', function() {
  it('Should Do Stuff', () => {
    expect(testFunc()).to.equal('hello')
  })

  it('Should Throw snoowrap NoCredentialsError if Insufficient Credentials', () => {
    const invalidCreds = {
      username: 'username',
      password: 'password'
    }

    expect(() => new RedditConnection({ invalidCreds } as any)).to.throw(
      snoowrap.errors.NoCredentialsError
    )
  })

  it('Should Throw an Error if no Credentials Property (OBJECT)', () => {
    expect(() => new Restyle({ noCredentials: 'moi' })).to.throw(
      Restyle.errors.NoCredentials
    )
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

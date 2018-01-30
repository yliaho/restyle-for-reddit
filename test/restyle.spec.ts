///<reference path="../bin/src/typings.d.ts"/>
///<reference types="@types/snoowrap"/>

import { expect } from 'chai'
import * as path from 'path'
import { exec } from 'child_process'
import Restyle from '../bin/src/Restyle'
import RedditConnection from '../bin/src/RedditConnection'
import * as snoowrap from 'snoowrap'
import 'mocha'

const command = `node ${path.resolve(__dirname, '../bin/restyle')} watch`

describe('Restyle', function() {
  it('Should Throw snoowrap NoCredentialsError if Insufficient Credentials', () => {
    const invalidCreds = {
      username: 'username',
      password: 'password'
    }

    expect(() => new RedditConnection({ invalidCreds } as any)).to.throw(
      (snoowrap as any).errors.NoCredentialsError
    )
  })

  it('Should Throw an Error if no Credentials Property (OBJECT)', () => {
    expect(() => new Restyle({ noCredentials: 'moi' })).to.throw(
      (Restyle as any).errors.NoCredentials
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

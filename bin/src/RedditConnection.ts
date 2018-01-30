import * as Snoowrap from 'snoowrap'
import { version as VERSION, author as AUTHOR } from '../../package.json'

export default class RedditConnector {
  private username: string = null
  private password: string = null
  private clientId: string = null
  private clientSecret: string = null
  private userAgent: string = null

  public snoowrap: Snoowrap = null

  constructor(credentials: RedditCredentials) {
    this.username = credentials.username
    this.password = credentials.password
    this.clientId = credentials.clientId
    this.clientSecret = credentials.clientSecret
    this.userAgent =
      `RESTYLE - Publish stylesheets from your favourite code editor.` +
      `Author: ${AUTHOR}, Version: ${VERSION}`

    this.connect()
  }

  private connect() {
    this.snoowrap = new Snoowrap({
      username: this.username,
      password: this.password,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      userAgent: this.userAgent
    })
  }

  get r() {
    return this.snoowrap
  }
}

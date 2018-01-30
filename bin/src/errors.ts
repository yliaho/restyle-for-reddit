import { MODULE_NAME } from './constants'

export class InvalidConfig extends Error {
  constructor() {
    super(
      `${MODULE_NAME} couldn't resolve config file. Please provide restyle.config.js in your project root`
    )
  }
}

export class NoCredentials extends Error {
  constructor() {
    super(
      `${MODULE_NAME} couldn't find credentials property in restyle config. Please provide a credentials property with username, password, clientId and clientSecret`
    )
  }
}

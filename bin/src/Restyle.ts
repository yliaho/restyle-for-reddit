import * as path from 'path'
import * as fs from 'fs'
import RedditConnector from './redditConnection'
import ScssCompiler from './scssCompiler'
import * as util from 'util'
import * as errors from './errors'

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

export default class Restyle {
  private connector: RedditConnector = null
  public config: any = null
  public scssCompiler: ScssCompiler = null

  constructor(config: string | object) {
    if (typeof config === 'string') {
      this.config = require(config)
    } else if (typeof config === 'object') {
      this.config = { ...config }
    } else {
      throw new errors.InvalidConfig()
    }

    this.init()
  }

  private init() {
    this.scssCompiler = new ScssCompiler()

    this.initConnector()
  }

  private initConnector() {
    if (this.config.credentials) {
      this.connector = new RedditConnector(this.config.credentials)
    } else {
      throw new errors.NoCredentials()
    }
  }

  public compileScss(input: string, output: string) {
    this.scssCompiler.render(input).then((render: any) => {
      writeFileAsync(output, render.css).then(() =>
        this.publish(this.config.output)
      )
    })
  }

  public watch(interval: number) {
    const { input, output } = this.config

    fs.watchFile(input, { interval }, (_curr, _prev) => {
      this.compileScss(input, output)
    })
  }

  private publish(cssPath) {
    readFileAsync(cssPath, { encoding: 'utf8' }).then(css => {
      this.connector.r
        .getSubreddit(this.config.subreddit)
        .updateStylesheet({
          css,
          reason: 'restyle'
        })
        .then(status)
        .catch(_error => errorHandler('Invalid CSS'))
    })

    function status(result) {
      console.log(result)
    }

    function errorHandler(error) {
      console.log(error)
    }
  }
}

;(Restyle as any).errors = errors

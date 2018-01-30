import * as path from 'path'
import * as fs from 'fs'
import RedditConnector from './redditConnection'
import ScssCompiler from './scssCompiler'
import * as util from 'util'

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

export const isDev = process.env.NODE_ENV === 'development' ? true : false

export default class Restyle {
  private connector: RedditConnector = null
  public config: any = null
  public scssCompiler: ScssCompiler = null

  constructor() {
    this.init()
  }

  private init() {
    this.scssCompiler = new ScssCompiler()

    this.initConfig()
    this.initConnector()
  }

  private initConfig() {
    this.config = isDev
      ? require(path.resolve(process.cwd(), 'test/sample/restyle.config.js'))
      : require(path.resolve(process.cwd(), 'restyle.config.js'))
  }

  private initConnector() {
    this.connector = new RedditConnector(this.config.credentials)
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

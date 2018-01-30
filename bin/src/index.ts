import * as path from 'path'
import Restyle from './Restyle'

export const isDev = process.env.NODE_ENV === 'development' ? true : false

const configPath = isDev
  ? require(path.resolve(process.cwd(), 'test/sample/restyle.config.js'))
  : require(path.resolve(process.cwd(), 'restyle.confige.js'))

const restyle = new Restyle(configPath)

function pushCssToSub() {
  restyle.watch(1000)
}

const program = require('commander')
program
  .version(process.env.VERSION)
  .command('watch [css] [subreddit]')
  .action(pushCssToSub)

program.parse(process.argv)

import * as program from 'commander'
import RedditConnector from './RedditConnection'
import Restyle from './Restyle'

const restyle = new Restyle()

function pushCssToSub() {
  restyle.watch(1000)
}

export function testFunc() {
  return 'hello'
}

program
  .version(process.env.VERSION)
  .command('watch [css] [subreddit]')
  .action(pushCssToSub)

program.parse(process.argv)

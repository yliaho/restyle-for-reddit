import program from 'commander'
import RedditConnector from './RedditConnection'
import Restyle from './Restyle'

const restyle = new Restyle()

function pushCssToSub() {
  restyle.watch(1000)
}

program
  .version(process.env.VERSION)
  .command('publish [css] [subreddit]')
  .action(pushCssToSub)

program.parse(process.argv)

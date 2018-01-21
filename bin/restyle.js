#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const program = require('commander')
const chalk = require('chalk')

const Snoowrap = require('snoowrap')

const readFileAsync = promisify(fs.readFile)

const VERSION = '0.1.0'
const CONFIG = require(path.resolve(process.cwd(), 'restyle.config.js'))
const SUBREDDIT_URL = subredditName =>
  `https://www.reddit.com/r/${subredditName}`

const r = new Snoowrap({
  ...CONFIG.credentials,
  userAgent: `Restyle by u/SloppyStone v.${VERSION} - Publishes CSS to subreddit`
})

const pushCssToSub = async (cssPath, subreddit) => {
  const style = cssPath || CONFIG.cssPath
  const sub = subreddit || CONFIG.subreddit

  console.clear()
  console.log(`Pushing css to ${chalk.cyan(sub)}...\n`)

  try {
    const css = await readFileAsync(style, {
      encoding: 'utf8'
    })

    await r.getSubreddit(sub).updateStylesheet({
      css,
      reason: 'restyle'
    })

    console.clear()
    console.log(`${chalk.green('Done!')}\n${SUBREDDIT_URL(sub)}\n`)
  } catch (error) {
    console.error(error)
  }
}

// COMMANDER
program
  .version(process.env.VERSION)
  .command('publish [css] [subreddit]')
  .action(pushCssToSub)

program.parse(process.argv)

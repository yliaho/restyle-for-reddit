import fs from 'fs'
import path from 'path'
import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import string from 'rollup-plugin-string'
import pkg from './package.json'

const commitHash = (function() {
  try {
    return fs.readFileSync('.commithash', 'utf8')
  } catch (error) {
    return 'unknown'
  }
})()

const banner = `/*
  Restyle.js v${pkg.version}
  ${new Date()} - commit ${commitHash}

  https://github.com/yliaho/restyle-for-reddit

  Released under MIT License.
*/`

const src = path.resolve('src')
const bin = path.resolve('bin')

function resolveTypescript() {
  return {
    name: 'resolve-typescript',
    resolveId(importee, importer) {
      // work around typescript's inability to resolve other extensions
      if (~importee.indexOf('help.md')) return path.resolve('bin/src/help.md')
      if (~importee.indexOf('package.json')) return path.resolve('package.json')

      // bit of a hack — TypeScript only really works if it can resolve imports,
      // but they misguidedly chose to reject imports with file extensions. This
      // means we need to resolve them here
      if (
        importer &&
        (importer.startsWith(src) || importer.startsWith(bin)) &&
        importee[0] === '.' &&
        path.extname(importee) === ''
      ) {
        return path.resolve(path.dirname(importer), `${importee}.ts`)
      }
    }
  }
}

export default [
  // src
  {
    input: 'src/index.ts',
    plugins: [
      json(),
      resolveTypescript(),
      typescript({
        typescript: require('typescript')
      }),
      resolve(),
      commonjs()
    ],
    external: [],
    banner,
    sourcemap: true,
    output: [
      { file: 'dist/restyle.js', format: 'cjs' },
      { file: 'dist/restyle.es.js', format: 'es' }
    ]
  },

  // bin/restyle
  {
    input: 'bin/src/index.ts',
    plugins: [
      string({ include: '**/*.md' }),
      json(),
      resolveTypescript(),
      typescript({
        typescript: require('typescript')
      }),
      commonjs({
        include: 'node_modules/**'
      }),
      resolve()
    ],
    external: ['commander', 'snoowrap', 'node-sass', 'fs', 'path', 'util'],
    output: {
      file: 'bin/restyle',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
      paths: {
        rollup: '../dist/restyle.js'
      }
    }
  }
]

#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob')
const path = require('path')
const yargs = require('yargs')

const globPattern = path.resolve(__dirname, 'packages/airfocus-*/src/**/*.i18n')
const mergedPath = path.resolve(__dirname, 'i18n-merged.json')
yargs
  .usage('usage: $0 <command>')
  .command('merge', 'merges individual .i18n files into a single .json file', runAsync(async () => {
    const files = await globAsync(globPattern)
    const contents = await Promise.all(files.map(f => readFileAsync(f).then(s => [f, JSON.parse(s)])))
    const merged = contents.reduce((acc, c) => ({
      ...acc,
      [c[0]]: c[1],
    }), {})
    await writeFileAsync(mergedPath, JSON.stringify(merged, null, 2))
  }))
  .command('split', 'splits single .json file into individual .i18n files', runAsync(async () => {
    const merged = await readFileAsync(mergedPath).then(JSON.parse)
    await Promise.all(Object.keys(merged).map(file => writeFileAsync(file, JSON.stringify(merged[file], null, 2))))
  }))
  .help('help')
  .wrap(null)
  .argv

function runAsync(fn) {
  return () => {
    fn().catch(err => {
      console.error(err)
      process.exit(1)
    })
  }
}

function globAsync(pattern) {
  return new Promise((res, rej) => glob(pattern, (error, result) => !error ? res(result) : rej(error)))
}

function readFileAsync(file) {
  return new Promise((res, rej) => fs.readFile(file, 'utf-8', (error, result) => !error ? res(result) : rej(error)))
}

function writeFileAsync(file, content) {
  return new Promise((res, rej) => fs.writeFile(file, content, 'utf-8', error => !error ? res() : rej(error)))
}

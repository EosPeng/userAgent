const fs = require('fs')
const rollup = require('rollup')
const uglify = require('uglify-js')

const builds = require('./index').getBuilds()

build(builds)

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

async function buildEntry (config) {
  const output = config.output
  const {file, banner} = output
  const isMin = /min\.js$/.test(file)

  const bundle = await rollup.rollup(config)

  const {code} = await bundle.generate(output)

  if (isMin) {
    const minified = (banner ? banner + '\n' : '') + uglify.minify(code).code
    fs.writeFileSync(file, minified)
  } else {
    fs.writeFileSync(file, code)
  }
}

function logError (e) {
  console.error(e)
}

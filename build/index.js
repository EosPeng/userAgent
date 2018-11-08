const path = require('path')
const babel = require('rollup-plugin-babel')
const pck = require('../package.json')

const version = pck.version

const resolve = p => {
  return path.resolve(__dirname, '../', p)
}

const banner =
  '/*!\n' +
  ' * userAgent v' + version + '\n' +
  ' * (c) 2018-' + new Date().getFullYear() + ' Eos Peng\n' +
  ' * Released under the MIT License.\n' +
  ' */'

const builds = {
  'web-dev': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/userAgent.js'),
    format: 'umd',
    banner
  },
  'web-prod': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/userAgent.min.js'),
    format: 'umd',
    banner
  },
  'web-cjs': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/userAgent.common.js'),
    format: 'cjs',
    banner
  },
  'web-esm': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/userAgent.esm.js'),
    format: 'es',
    banner
  }
}

function getConfig (name) {
  const opts = builds[name]
  return {
    input: opts.entry,
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'UserAgent'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
}

if (process.env.VERSION) {
  module.exports = getConfig(process.env.VERSION)
} else {
  exports.getBuilds = () => Object.keys(builds).map(getConfig)
}

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
    dest: resolve('dist/bundle.js'),
    format: 'umd',
    env: 'development',
    banner
  }
}

const opts = builds['web-dev']

module.exports = {
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

/**
 * get os/browser version
 * @param  {String} ua    user agent
 * @param  {String | RegExp} token os/browser name
 * @return {String}       version 'Major.Minor.Patch'
 */
export function getVersion (ua, token) {
  try {
    return normalizeSemverString(ua.split(token)[1].trim().split(/[^\w\.]/)[0])
  } catch (error) {
    // ignore
  }
  return '0.0.0'
}

/**
 * 'x_y_z'  =>  'x.y.z'
 * 'x.y.z'  =>  'x.y.z'
 * @param  {String} version 'x_y_z' | 'x.y.z'
 * @return {String}         'x.y.z'
 */
function normalizeSemverString (version) {
  const ary = version.split(/[\._]/)
  return (parseInt(ary[0], 10) || 0) + '.' +
    (parseInt(ary[1], 10) || 0) + '.' +
    (parseInt(ary[2], 10) || 0)
}

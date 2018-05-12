import {_GLOBAL} from './constants'
import {getVersion} from './utils'

/**
 * init OS environment
 * @param  {UserAgent} UA UserAgent instance
 */
export function initOS (UA) {
  const nav = _GLOBAL['navigator'] || {}
  const ua = UA.USER_AGENT
  const os = OSDetect(ua)
  const osVersion = OSVersionDetect(ua, os)

  const mobile = /Android|iOS/.test(os) || /Windows Phone/.test(ua)
  const iOS = os === 'iOS'
  const android = os === 'Android'
  const lang = languageDetect(nav)

  const result = {
    'OS': os,
    'OS_VERSION': osVersion,
    'PC': !mobile,
    'mobile': mobile,
    'language': lang,
    'iOS': iOS, // is iOS.      (iPhone, iPad)
    'Mac': os === 'Mac', // is Mac OS X. [alias]
    'macOS': os === 'Mac', // is macOS.
    'Android': android, // is Android.
    'Windows': os === 'Windows', // is Windows.  (Windows, WindowsPhone)
    'iPad': iOS && /iPad/.test(ua), // is iPad
    'iPhone': iOS && /iPhone/.test(ua) // is iPhone
  }

  Object.assign(UA, result)
}

/**
 * [OSDetect description]
 * @param  {String} ua userAgent
 * @return {String}     'Android' 'iOS' 'Windows' 'Mac' 'Chrome OS'
 */
function OSDetect (ua) {
  switch (true) {
    case /Android/.test(ua):
      return 'Android'
    case /iPhone|iPad/.test(ua):
      return 'iOS'
    case /Windows/.test(ua):
      return 'Windows'
    case /Mac OS X/.test(ua):
      return 'Mac'
    case /CrOS/.test(ua):
      // https://developers.whatismybrowser.com/useragents/explore/operating_system_name/chromeos/
      return 'Chrome OS'
    case /Linux/.test(ua):
      return 'Linux'
  }
  return ''
}
/**
 * [OSVersionDetect description]
 * @param {String} ua userAgent
 * @param {String} os
 * @return {String}   'x.x.x'
 */
function OSVersionDetect (ua, os) {
  switch (os) {
    case 'Android':
      return getVersion(ua, 'Android')
    case 'iOS':
      return getVersion(ua, /OS /)
    case 'Windows':
      return getVersion(ua, /Phone/.test(ua) ? /Windows Phone (?:OS )?/ : /Windows NT/)
    case 'Mac':
      return getVersion(ua, /Mac OS X /)
  }
  return '0.0.0'
}
/**
 * get language
 * @param  {Object} nav window.navigator || global.navigator
 * @return {String}     'en', 'zh' ect...
 */
function languageDetect (nav) {
  let lang = nav['language'] || ''

  if (nav['languages'] && Array.isArray(nav['languages'])) {
    lang = nav['languages'][0] || lang
  }
  return lang.split('-')[0] // "en-US" -> "en"
}

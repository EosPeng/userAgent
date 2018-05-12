import {BASE_BROWSERS} from './constants'
import {getVersion} from './utils'

/**
 * [initBrowser description]
 * @param  {UserAgent} UA UserAgent instance
 */
export function initBrowser (UA) {
  const ua = UA.USER_AGENT
  const browser = browserDetect(ua)
  const browserVersion = browserVersionDetect(ua, browser)
  const baseBrowser = baseBrowserDetect(browser)

  const result = {
    'browser': browser,
    'base_browser': baseBrowser,
    'browser_version': browserVersion,
    'IE': browser === 'IE', // is IE
    'Edge': browser === 'Edge', // is Edge
    'Firefox': browser === 'Firefox', // is Firefox
    'Chrome': browser === 'Chrome', // is Chrome
    'Safari': browser === 'Safari', // is Safari
    'WebKit': baseBrowser === 'WebKit', // is WebKit based browser
    'Chromium': baseBrowser === 'Chromium' // is Chromium based browser
  }

  Object.assign(UA, result)
}

/**
 * browser detect
 * @param  {String} ua userAgent
 * @return {String}    browser name
 */
function browserDetect (ua) {
  switch (true) {
    case /CriOS/.test(ua):
      return 'Chrome for iOS' // https://developer.chrome.com/multidevice/user-agent
    case /Edge/.test(ua):
      return 'Edge'
    case /Chrome/.test(ua):
      return 'Chrome'
    case /Firefox/.test(ua):
      return 'Firefox'
    case /MSIE|Trident/.test(ua):
      return 'IE'
    case /Safari\//.test(ua):
      return 'Safari'
    case /AppleWebKit/.test(ua):
      return 'WebKit'
  }
  return ''
}

/**
 * browser version detect
 * @param  {String} ua      userAgent
 * @param  {String} browser browser name
 * @return {String}         'x.x.x'
 */
function browserVersionDetect (ua, browser) {
  switch (browser) {
    case 'Chrome for iOS':
      return getVersion(ua, 'CriOS/')
    case 'Edge':
      return getVersion(ua, 'Edge/')
    case 'Chrome':
      return getVersion(ua, 'Chrome/')
    case 'Firefox':
      return getVersion(ua, 'Firefox/')
    case 'IE':
      return /IEMobile/.test(ua) ? getVersion(ua, 'IEMobile/')
        : /MSIE/.test(ua) ? getVersion(ua, 'MSIE ') // IE 10
        : getVersion(ua, 'rv:') // IE 11
    case 'Safari':
      return getVersion(ua, 'Version/')
    case 'WebKit':
      return getVersion(ua, 'WebKit/')
  }
  return '0.0.0'
}

/**
 * base browser detect
 * @param  {String} browser browser name
 * @return {String}         base browser name
 */
function baseBrowserDetect (browser) {
  return BASE_BROWSERS[browser] || ''
}

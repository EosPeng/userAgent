/*!
 * userAgent v0.1.0
 * (c) 2018-2018 Eos Peng
 * Released under the MIT License.
 */
'use strict';

var _GLOBAL = typeof window === 'undefined' ? {} : window;

var BASE_BROWSERS = {
  'Chrome': 'Chromium',
  'Firefox': 'Gecko',
  'IE': 'Trident',
  'Edge': 'Edge',
  'Safari': 'WebKit',
  'WebKit': 'WebKit',
  'Chrome for iOS': 'WebKit'
};

/**
 * get os/browser version
 * @param  {String} ua    user agent
 * @param  {String | RegExp} token os/browser name
 * @return {String}       version 'Major.Minor.Patch'
 */
function getVersion(ua, token) {
  try {
    return normalizeSemverString(ua.split(token)[1].trim().split(/[^\w\.]/)[0]);
  } catch (error) {
    // ignore
  }
  return '0.0.0';
}

/**
 * 'x_y_z'  =>  'x.y.z'
 * 'x.y.z'  =>  'x.y.z'
 * @param  {String} version 'x_y_z' | 'x.y.z'
 * @return {String}         'x.y.z'
 */
function normalizeSemverString(version) {
  var ary = version.split(/[\._]/);
  return (parseInt(ary[0], 10) || 0) + '.' + (parseInt(ary[1], 10) || 0) + '.' + (parseInt(ary[2], 10) || 0);
}

/**
 * init OS environment
 * @param  {UserAgent} UA UserAgent instance
 */
function initOS(UA) {
  var nav = _GLOBAL['navigator'] || {};
  var ua = UA.USER_AGENT;
  var os = OSDetect(ua);
  var osVersion = OSVersionDetect(ua, os);

  var mobile = /Android|iOS/.test(os) || /Windows Phone/.test(ua);
  var iOS = os === 'iOS';
  var android = os === 'Android';
  var lang = languageDetect(nav);

  var result = {
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
  };

  Object.assign(UA, result);
}

/**
 * [OSDetect description]
 * @param  {String} ua userAgent
 * @return {String}     'Android' 'iOS' 'Windows' 'Mac' 'Chrome OS'
 */
function OSDetect(ua) {
  switch (true) {
    case /Android/.test(ua):
      return 'Android';
    case /iPhone|iPad/.test(ua):
      return 'iOS';
    case /Windows/.test(ua):
      return 'Windows';
    case /Mac OS X/.test(ua):
      return 'Mac';
    case /CrOS/.test(ua):
      // https://developers.whatismybrowser.com/useragents/explore/operating_system_name/chromeos/
      return 'Chrome OS';
    case /Linux/.test(ua):
      return 'Linux';
  }
  return '';
}
/**
 * [OSVersionDetect description]
 * @param {String} ua userAgent
 * @param {String} os
 * @return {String}   'x.x.x'
 */
function OSVersionDetect(ua, os) {
  switch (os) {
    case 'Android':
      return getVersion(ua, 'Android');
    case 'iOS':
      return getVersion(ua, /OS /);
    case 'Windows':
      return getVersion(ua, /Phone/.test(ua) ? /Windows Phone (?:OS )?/ : /Windows NT/);
    case 'Mac':
      return getVersion(ua, /Mac OS X /);
  }
  return '0.0.0';
}
/**
 * get language
 * @param  {Object} nav window.navigator || global.navigator
 * @return {String}     'en', 'zh' ect...
 */
function languageDetect(nav) {
  var lang = nav['language'] || '';

  if (nav['languages'] && Array.isArray(nav['languages'])) {
    lang = nav['languages'][0] || lang;
  }
  return lang.split('-')[0]; // "en-US" -> "en"
}

/**
 * [initBrowser description]
 * @param  {UserAgent} UA UserAgent instance
 */
function initBrowser(UA) {
  var ua = UA.USER_AGENT;
  var browser = browserDetect(ua);
  var browserVersion = browserVersionDetect(ua, browser);
  var baseBrowser = baseBrowserDetect(browser);

  var result = {
    'browser': browser,
    'base_browser': baseBrowser,
    'browser_version': browserVersion,
    'IE': browser === 'IE', // is IE
    'Edge': browser === 'Edge', // is Edge
    'Firefox': browser === 'Firefox', // is Firefox
    'Chrome': browser === 'Chrome', // is Chrome
    'Safari': browser === 'Safari', // is Safari
    'WebKit': baseBrowser === 'WebKit', // is WebKit based browser
    'Chromium': baseBrowser === 'Chromium', // is Chromium based browser
    // app detect
    'isWechat': isWechat(ua)
  };

  Object.assign(UA, result);
}

/**
 * browser detect
 * @param  {String} ua userAgent
 * @return {String}    browser name
 */
function browserDetect(ua) {
  switch (true) {
    case /CriOS/.test(ua):
      return 'Chrome for iOS'; // https://developer.chrome.com/multidevice/user-agent
    case /Edge/.test(ua):
      return 'Edge';
    case /Chrome/.test(ua):
      return 'Chrome';
    case /Firefox/.test(ua):
      return 'Firefox';
    case /MSIE|Trident/.test(ua):
      return 'IE';
    case /Safari\//.test(ua):
      return 'Safari';
    case /AppleWebKit/.test(ua):
      return 'WebKit';
  }
  return '';
}

/**
 * browser version detect
 * @param  {String} ua      userAgent
 * @param  {String} browser browser name
 * @return {String}         'x.x.x'
 */
function browserVersionDetect(ua, browser) {
  switch (browser) {
    case 'Chrome for iOS':
      return getVersion(ua, 'CriOS/');
    case 'Edge':
      return getVersion(ua, 'Edge/');
    case 'Chrome':
      return getVersion(ua, 'Chrome/');
    case 'Firefox':
      return getVersion(ua, 'Firefox/');
    case 'IE':
      return (/IEMobile/.test(ua) ? getVersion(ua, 'IEMobile/') : /MSIE/.test(ua) ? getVersion(ua, 'MSIE ') // IE 10
        : getVersion(ua, 'rv:')
      ); // IE 11
    case 'Safari':
      return getVersion(ua, 'Version/');
    case 'WebKit':
      return getVersion(ua, 'WebKit/');
  }
  return '0.0.0';
}

/**
 * base browser detect
 * @param  {String} browser browser name
 * @return {String}         base browser name
 */
function baseBrowserDetect(browser) {
  return BASE_BROWSERS[browser] || '';
}

/**
 * is in weChat app
 * @param  {String}  ua userAgent
 * @return {Boolean}
 */
function isWechat(ua) {
  return (/MicroMessenger/.test(ua)
  );
}

/**
 * class UserAgent
 * @param  {String} userAgent     window.navigator.userAgent
 * @return {Object}              this
 */
function UserAgent(userAgent) {
  if (UserAgent._instance instanceof UserAgent) {
    return UserAgent._instance;
  }
  this._init(userAgent);
  UserAgent._instance = this;
}

/**
 * init function
 * @param  {String} userAgent window.navigator.userAgent
 */
UserAgent.prototype._init = function _init(userAgent) {
  var nav = _GLOBAL['navigator'] || {};
  var ua = userAgent || nav['userAgent'] || '';
  this.USER_AGENT = ua;
  initOS(this);
  initBrowser(this);
};

module.exports = UserAgent;

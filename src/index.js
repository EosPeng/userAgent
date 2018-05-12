import {_GLOBAL} from './constants'
import {initOS} from './os.js'
import {initBrowser} from './browser'

/**
 * class UserAgent
 * @param  {String} userAgent     window.navigator.userAgent
 * @return {Object}              this
 */
function UserAgent (userAgent) {
  if (UserAgent._instance instanceof UserAgent) {
    return UserAgent._instance
  }
  this._init(userAgent)
  UserAgent._instance = this
}

/**
 * init function
 * @param  {String} userAgent window.navigator.userAgent
 */
UserAgent.prototype._init = function _init (userAgent) {
  let nav = _GLOBAL['navigator'] || {}
  let ua = userAgent || nav['userAgent'] || ''
  this.USER_AGENT = ua
  initOS(this)
  initBrowser(this)
}

export default UserAgent

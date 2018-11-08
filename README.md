# userAgent

userAgent string parser

## How To Use

### npm

```shell
# indtall
$ npm i -S @eos/user-agent
```

and

```javascript
// in your javascript file
import UserAgent from '@eos/user-agent'
const UA = new UserAgent()
```

or pass a user agent string

```javascript
const UA = new UserAgent('Mozilla/5.0 (X11; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0')
```

### `<script>`

```html
<script src="dist/userAgent.min.js"></script>
<script>
  const UA = new UserAgent()
</script>
```

## the UA object


#### USER_AGENT
- **type:** String
- **value:** 'Mozilla/5.0 (X11; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0'

#### OS
- **type:** String
- **value:** 'Linux', 'Windows', 'Mac', 'Android', 'iOS', 'Chrome OS'

#### OS_VERSION
- **type:** String
- **value:** '0.0.0'

#### language
- **type:** String
- **value:** 'en', 'zh', ....

#### PC
- **type:** Boolean

#### mobile
- **type:** Boolean

#### Windows
- **type:** Boolean

#### Mac
- **type:** Boolean

#### macOS
- **type:** Boolean

#### iOS
- **type:** Boolean

#### iPad
- **type:** Boolean

#### iPhone
- **type:** Boolean

#### Android
- **type:** Boolean

#### browser
- **type:** String
- **value:** 'Firefox', 'Chrome', 'Edge', 'IE', 'Chrome for iOS', 'Safari', 'WebKit'

#### base_browser
- **type:** String
- **value:** 'Gecko', 'Chromium', 'Edge', 'Trident', 'WebKit'

#### browser_version
- **type:** String
- **value:** '63.0.0'

#### IE
- **type:** Boolean

#### Edge
- **type:** Boolean

#### Firefox
- **type:** Boolean

#### Chrome
- **type:** Boolean

#### Safari
- **type:** Boolean

#### WebKit
- **type:** Boolean

#### Chromium
- **type:** Boolean

#### isWechat
- **type:** Boolean

## License

[MIT](http://opensource.org/licenses/MIT)

# aurelia-sentry

A wrapper around [Sentry](https://sentry.io/)'s [Browser client](https://github.com/getsentry/sentry-javascript/tree/master/packages/browser) to be added to Aurelia's LogManager.

## Usage

Install the package:

```bash
$ yarn add aurelia-sentry
```

Add the library to your base template - this will catch more errors before Aurelia has chance to boot.

```html
<script src="https://browser.sentry-cdn.com/4.6.6/bundle.min.js"
        crossorigin="anonymous"
></script>
<!-- Configure your DSN here too -->
<script>Sentry.init({ dsn: '{{ sentry_dsn }}' });</script>
```

Then update your main.js in Aurelia to add the SentryAppender as early as possible.

```javascript
// main.js
import { LogManager } from 'aurelia-framework';
import { SentryAppender } from 'aurelia-sentry';

LogManager.addAppender(new SentryAppender());
LogManager.setLevel(LogManager.logLevel.error);

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();
  
  aurelia.start().then(() => aurelia.setRoot());
}
```

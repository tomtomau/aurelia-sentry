# aurelia-sentry

A wrapper around [Sentry](https://sentry.io/)'s [Raven.js](https://github.com/getsentry/raven-js) to be added to Aurelia's LogManager.

# DOCS

## Usage

```javascript
// main.js
import { LogManager } from 'aurelia-framework';
import { SentryAppender } from 'aurelia-sentry';

LogManager.addAppender(new SentryAppender());
LogManager.setLevel(LogManager.logLevel.debug);

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();
  
  aurelia.start().then(() => aurelia.setRoot());
}
```

## Setting a User Context

To set a user context, you can pass it to the actual logger or just use aurelia's event aggregator and use the `sentry:user-context:set`. To clear the user context, pass it a null data.

```javascript
SentryLogger.setUserContext({
  email: 'matt@example.com',
  id: '123'
});
```

Using event aggregator

```javascript
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class SomeVM {
  constructor(ea) {
    this.ea = ea;
    this.ea.publish('sentry:user-context:set', {
      email: 'matt@example.com',
      id: '123'
    });
  }
  detached() {
    this.ea.publish('sentry:user-context:set', null);
  }
}
```
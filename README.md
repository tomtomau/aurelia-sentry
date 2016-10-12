# aurelia-sentry

@TODO: Add docs :)

# API DOCS

## Setting a User Context

To set a user context, you can either pass in the object during construction or set it at any point in time.

```javascript
import { SentryAppender } from 'aurelia-sentry';

let SentryLogger = new SentryAppender({
    userContext: {
        email: 'matt@example.com',
        id: '123'
    }
});

```

```javascript
SentryLogger.setUserContext({
    email: 'matt@example.com',
    id: '123'
});
```
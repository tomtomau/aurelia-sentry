import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

const USER_CONTEXT_EVENT = 'sentry:user-context:set';

@inject(EventAggregator)
export class SentryAppender {
  constructor(ea) {
    // @TODO: Maybe do something here to check for Raven?
    // This check is required as sometimes 'ea' is undefined when the object is created.
    if (!ea) ea = new EventAggregator();
    this._eventSubscription = ea.subscribe(USER_CONTEXT_EVENT, (data) => {
      this.setUserContext(data);
    });
  }

  error(logger, error, ...rest) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      raven.captureMessage(error, rest);
    }
  }

  info(logger, info, ...rest) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      let data = Object.assign({ level: 'info'}, rest);

      raven.captureMessage(info, data);
    }
  }

  warn(logger, warning, ...rest) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      let data = Object.assign({ level: 'warning'}, rest);

      raven.captureMessage(warning, data);
    }
  }

  debug(logger, debug, ...rest) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      let data = Object.assign({ level: 'info'}, rest);

      raven.captureMessage(debug, data);
    }
  }

  getRaven() {
    return window.Raven;
  }

  setUserContext(userContext) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      raven.setUserContext(userContext);
    }
  }
}

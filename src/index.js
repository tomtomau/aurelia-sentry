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

  error(logger, message, ...rest) {
    this.captureMessage('error', message, rest);
  }

  info(logger, message, ...rest) {
    this.captureMessage('info', message, rest);
  }

  warn(logger, message, ...rest) {
    this.captureMessage('warning', message, rest);
  }

  debug(logger, message, ...rest) {
    this.captureMessage('debug', message, rest);
  }

  captureMessage(level, message, rest) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      let extra = Object.assign({}, ...rest);
      let data = { level, extra };

      raven.captureMessage(message, data);
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

var _dec, _class;

import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

export let SentryAppender = (_dec = inject(EventAggregator), _dec(_class = class SentryAppender {
  constructor(ea) {
    if (!ea) ea = new EventAggregator();
    this._eventSubscription = ea.subscribe('sentry:user-context:set', data => {
      this.setUserContext(data);
    });
  }

  error(logger, error) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      raven.captureException(error);
    }
  }

  info(logger, info) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      raven.captureMessage(info, { level: 'info' });
    }
  }

  warn(logger, warning) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      raven.captureMessage(warning, { level: 'warning' });
    }
  }

  debug(logger, debug) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      raven.captureMessage(debug, { level: 'info' });
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
}) || _class);
export class SentryAppender {
  constructor(config) {
    // @TODO: Maybe do something here to check for Raven?
    // If a config was given
    if (config) {
      // if the usercontext was given
      if (config.userContext) {
        this.setUserContext(config.userContext);
      }
    }
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

  setUserContext (userContext) {
    let raven = this.getRaven();

    if (typeof raven !== 'undefined') {
      raven.setUserContext(userContext);
    }
  }
}
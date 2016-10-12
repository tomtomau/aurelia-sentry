'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var SentryAppender;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('SentryAppender', SentryAppender = function () {
        function SentryAppender() {
          _classCallCheck(this, SentryAppender);
        }

        SentryAppender.prototype.error = function error(logger, _error) {
          var raven = this.getRaven();

          if (typeof raven !== 'undefined') {
            raven.captureException(_error);
          }
        };

        SentryAppender.prototype.info = function info(logger, _info) {
          var raven = this.getRaven();

          if (typeof raven !== 'undefined') {
            raven.captureMessage(_info, { level: 'info' });
          }
        };

        SentryAppender.prototype.warn = function warn(logger, warning) {
          var raven = this.getRaven();

          if (typeof raven !== 'undefined') {
            raven.captureMessage(warning, { level: 'warning' });
          }
        };

        SentryAppender.prototype.debug = function debug(logger, _debug) {
          var raven = this.getRaven();

          if (typeof raven !== 'undefined') {
            raven.captureMessage(_debug, { level: 'info' });
          }
        };

        SentryAppender.prototype.getRaven = function getRaven() {
          return window.Raven;
        };

        return SentryAppender;
      }());

      _export('SentryAppender', SentryAppender);
    }
  };
});
'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator'], function (_export, _context) {
  "use strict";

  var inject, EventAggregator, _dec, _class, SentryAppender;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      _export('SentryAppender', SentryAppender = (_dec = inject(EventAggregator), _dec(_class = function () {
        function SentryAppender(ea) {
          var _this = this;

          _classCallCheck(this, SentryAppender);

          if (!ea) ea = new EventAggregator();
          this._eventSubscription = ea.subscribe('sentry:user-context:set', function (data) {
            _this.setUserContext(data);
          });
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

        SentryAppender.prototype.setUserContext = function setUserContext(userContext) {
          var raven = this.getRaven();

          if (typeof raven !== 'undefined') {
            raven.setUserContext(userContext);
          }
        };

        return SentryAppender;
      }()) || _class));

      _export('SentryAppender', SentryAppender);
    }
  };
});
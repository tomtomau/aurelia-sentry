'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator'], function (_export, _context) {
  "use strict";

  var inject, EventAggregator, _dec, _class, USER_CONTEXT_EVENT, SentryAppender;

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
      USER_CONTEXT_EVENT = 'sentry:user-context:set';

      _export('SentryAppender', SentryAppender = (_dec = inject(EventAggregator), _dec(_class = function () {
        function SentryAppender(ea) {
          var _this = this;

          _classCallCheck(this, SentryAppender);

          if (!ea) ea = new EventAggregator();
          this._eventSubscription = ea.subscribe(USER_CONTEXT_EVENT, function (data) {
            _this.setUserContext(data);
          });
        }

        SentryAppender.prototype.error = function error(logger, message) {
          for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            rest[_key - 2] = arguments[_key];
          }

          this.captureMessage('error', message, rest);
        };

        SentryAppender.prototype.info = function info(logger, message) {
          for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            rest[_key2 - 2] = arguments[_key2];
          }

          this.captureMessage('info', message, rest);
        };

        SentryAppender.prototype.warn = function warn(logger, message) {
          for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }

          this.captureMessage('warning', message, rest);
        };

        SentryAppender.prototype.debug = function debug(logger, message) {
          for (var _len4 = arguments.length, rest = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            rest[_key4 - 2] = arguments[_key4];
          }

          this.captureMessage('debug', message, rest);
        };

        SentryAppender.prototype.captureMessage = function captureMessage(level, message, rest) {
          var raven = this.getRaven();

          if (typeof raven !== 'undefined') {
            var extra = Object.assign.apply(Object, [{}].concat(rest));
            var data = { level: level, extra: extra };

            raven.captureMessage(message, data);
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
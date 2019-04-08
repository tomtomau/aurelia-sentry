import * as Sentry from '@sentry/browser';

export class SentryAppender {
    private static captureEvent(level, message, rest) {
        const extra = Object.assign({}, ...rest);

        Sentry.captureEvent({message, level, extra});
    }

    public error(logger, message, ...rest) {
        SentryAppender.captureEvent('error', message, rest);
    }

    public info(logger, message, ...rest) {
        SentryAppender.captureEvent('info', message, rest);
    }

    public warn(logger, message, ...rest) {
        SentryAppender.captureEvent('warning', message, rest);
    }

    public debug(logger, message, ...rest) {
        SentryAppender.captureEvent('debug', message, rest);
    }
}

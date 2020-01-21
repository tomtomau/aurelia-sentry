import * as Sentry from '@sentry/browser';

export enum Levels {
    debug,
    warning,
    info,
    error,
}

export class SentryAppender {
    public static captureEvent(level, message, rest) {
        const extra = Object.assign({}, ...rest);

        Sentry.captureEvent({message, level, extra});
    }

    private minLevel: Levels = Levels.debug;

    constructor(config: { minLevel: Levels } = null) {
        if (config !== null && config.hasOwnProperty('minLevel')) {
            this.minLevel = config.minLevel;
        }
    }

    public error(logger, message, ...rest) {
        if (!this.shouldLog(Levels.error)) {
            return;
        }

        SentryAppender.captureEvent('error', message, rest);
    }

    public info(logger, message, ...rest) {
        if (!this.shouldLog(Levels.info)) {
            return;
        }

        SentryAppender.captureEvent('info', message, rest);
    }

    public warn(logger, message, ...rest) {
        if (!this.shouldLog(Levels.warning)) {
            return;
        }

        SentryAppender.captureEvent('warning', message, rest);
    }

    public debug(logger, message, ...rest) {
        if (!this.shouldLog(Levels.debug)) {
            return;
        }

        SentryAppender.captureEvent('debug', message, rest);
    }

    private shouldLog(level: Levels) {
        return level >= this.minLevel;
    }
}

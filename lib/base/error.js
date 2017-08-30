'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.08 22:04:09
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * According to https://github.com/koajs/koa/blob/v2.x/docs/error-handling.md
 */

class HttpError extends Error {
    constructor(message, code, name) {
        super(message);
        this.status = code || 500;
        this.name = name || this.constructor.name;
    }

    static badParameter (message) {
        return new HttpError(message, 400, 'BadParameter');
    }

    static authFail(message) {
        return new HttpError(message, 401, 'Unauthorized');
    }

    static forbidden(message) {
        return new HttpError(message, 403, 'Forbidden');
    }
}

module.exports = HttpError;

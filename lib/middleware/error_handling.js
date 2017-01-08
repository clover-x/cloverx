'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.08 22:04:09
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * Http Error Handling
 * According to https://github.com/koajs/koa/blob/v2.x/docs/error-handling.md
 */
const adapterOutputSouche = require('../adapter/output_souche.js');

module.exports = () => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            // will only respond with JSON
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = adapterOutputSouche.common(
                err.status,
                {
                    message: err.message
                }
            );
        }
    };
};

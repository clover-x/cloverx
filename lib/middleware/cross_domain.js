'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.12 19:05:43
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 开启跨域
 */

module.exports = () => {
    return (ctx, next) => {
        ctx.response.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Methods': 'PUT, DELETE, POST, GET, OPTIONS, HEAD'
        });

        return next();
    };
};

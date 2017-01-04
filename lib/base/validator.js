'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 16:30:43
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 参数校验模块
 *
 * 从 ctx.filter 取到过滤后的值
 */

const _ = require('lodash');
const Joi = require('joi');
const adapterOutputSouche = require('../adapter/output_souche.js');

/**
 * 检查器
 */
function checker (opts) {
    let options = {
        stripUnknown: true
    };

    return function (ctx, next) {
        let result = new Map();

        if(!_.isEmpty(opts.params)) {
            result.set('params', Joi.validate(ctx.params, opts.params, options));
        }

        if(!_.isEmpty(opts.query)) {
            result.set('query', Joi.validate(ctx.query, opts.query, options));
        }

        if(!_.isEmpty(opts.body)) {
            result.set('body', Joi.validate(ctx.request.body, opts.body, options));
        }

        // 绑定过滤值
        ctx.filter = {};
        for(let [key, value] of result) {
            if(value.error) {
                ctx.body = adapterOutputSouche.common(10002, null, value.error.message);
                ctx.status = 400;
                return;
            } else {
                ctx.filter[key] = value.value;
            }
        }

        return next();
    };
}

exports.checker = checker;

/**
 * 条件声明模块
 */
exports.V = Joi;

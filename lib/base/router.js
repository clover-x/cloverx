'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 11:13:15
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * https://github.com/alexmingoia/koa-router/tree/master
 * 路由基类，继承自 koa-router@next
 */

const koaRouter = require('koa-router');
const checker = require('./validator.js').checker;
const adapterOutputSouche = require('../adapter/output_souche.js');

class Router extends koaRouter {
    constructor(...args) {
        super(...args);
    }

    /**
     * 路由定义
     * @param {Object} opts
     *   - {String} desc - 接口简单描述
     *   - {Object} params - 请求参数
     *   - {Object} query - 请求参数
     *   - {Object} body - 请求参数
     *   - {String} method - 请求方式
     *   - {[Function]|Function} processors  - 请求处理器，支持多中间件
     */
    push(opts) {
        let processors = [checker(opts)].concat(opts.processors).concat(adapterOutputSouche.format);

        if (opts.method.toLowerCase() === 'all') {
            super.all(opts.path, ...processors);
        } else {
            super.register(opts.path, [opts.method], processors, {
                name: null
            });
        }
    }
}

module.exports = Router;

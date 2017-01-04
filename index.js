'use strict';

const debug = require('debug')('clover:🍀 :main');
const Koa = require('koa');
const koaBody = require('koa-body');

/**
 * 启动 clover
 * @params {Object} options
 *  - {String} baseDir - 项目目录
 *  - {String} cloverEnv - 启动环境，可选值：production, development
 */
function start (options) {
    /*************** 环境变量声明 ***************/
    process.env.CLOVER_BASE_DIR = options.baseDir;
    process.env.CLOVER_ENV = options.cloverEnv;

    const app = new Koa();
    /*************** 加载 Body Parser ***************/
    app.use(koaBody());

    /*************** 加载配置文件 ***************/
    exports.config = require('./lib/load_config.js');

    /*************** 加载验证器 ***************/
    exports.validator = require('./lib/base/validator.js').V;

    /*************** 加载路由 ***************/
    require('./lib/load_controller.js').load(app);

    /*************** 启动应用 ***************/
    app.listen(exports.config.port, function () {
        debug('App listen on port %s', exports.config.port);
    });
}

module.exports.start = start;

/**
 * 路由基类
 */
module.exports.Router = require('./lib/base/router.js');

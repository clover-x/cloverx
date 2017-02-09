'use strict';

const debug = require('debug')('cloverx:🍀 :main');
const Koa = require('koa');
const koaBody = require('koa-body');
const Container = require('./lib/extend/container.js');
const errorHandling = require('./lib/middleware/error_handling.js');
const crossDomain = require('./lib/middleware/cross_domain.js');

/**
 * 启动 clover
 * @params {Object} options
 *  - {String} baseDir - 项目目录
 *  - {String} cloverEnv - 启动环境，可选值：production, development
 */
function start (options) {
    /*************** 环境变量声明 ***************/
    process.env.CLOVERX_BASE_DIR = options.baseDir;
    process.env.CLOVERX_ENV = options.cloverEnv;

    const app = new Koa();
    const server = require('http').createServer(app.callback());

    /*************** 加载 中间件 ***************/
    app.use(koaBody());
    app.use(errorHandling());

    /*************** 加载 错误处理 ***************/
    exports.Error = require('./lib/base/error.js');

    /*************** 加载配置文件 ***************/
    exports.config = require('./lib/load_config.js');
    
    /*************** 加载 helper ***************/
    exports.helper = new Container();
    require('./lib/load_helper.js').load(exports);

    /*************** 加载数据库模型定义 ***************/
    exports.S = require('sequelize');
    require('./lib/load_connection.js').load(exports);
    require('./lib/load_schema.js').load(exports);

    /*************** 加载验证器 ***************/
    exports.validator = require('./lib/base/validator.js').V;

    /*************** 加载 model ***************/
    exports.model = new Container();
    require('./lib/load_model.js').load(exports);

    /*************** 开启跨域 ***************/
    app.use(crossDomain());

    /*************** 加载路由 ***************/
    require('./lib/load_controller.js').load(app);

    /*************** 加载文档 ***************/
    require('./lib/load_doc.js').load(exports, app);

    /*************** 启动应用 ***************/
    server.listen(exports.config.port, function () {
        debug('App listen on port %s', exports.config.port);
    });

    return server;
}

/**
 * 路由基类
 */
module.exports.Router = require('./lib/base/router.js');

/**
 * 启动方法
 */
module.exports.start = start;

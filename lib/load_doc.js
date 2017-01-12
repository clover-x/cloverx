'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.12 16:00:29
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 加载文档更新
 */

const debug = require('debug')('cloverx:🍀 :loadDoc');
const _ = require('lodash');
const cloverxDoc = require('cloverx-doc');
const Router = require('./base/router.js');

function load (cloverx, app) {
    let docConfig = cloverx.config.plugin.doc;
    let swaggerDoc = cloverxDoc.convert({
        baseDir: process.env.CLOVERX_BASE_DIR,
        config: _.omit(docConfig, [
            'pathHash'
        ])
    });

    debug('Traslate commont into swagger specific format');

    let docRouter = new Router();
    let path = `/__cloverx/__doc/${docConfig.pathHash || +(new Date())}/__swagger.json`;
    docRouter
        .get(path, function (ctx) {
            ctx.body = swaggerDoc;
        });

    app.use(docRouter.routes())
       .use(docRouter.allowedMethods());

    debug(`Swagger.json was mouted on http://${cloverx.config.host}:${cloverx.config.port}${path}`);
}

exports.load = load;

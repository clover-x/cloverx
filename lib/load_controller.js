'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 10:09:46
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 加载路由
 */

const debug = require('debug')('clover:🍀 :loadController');
const fs = require('fs');
const path = require('path');

let baseDir = process.env.CLOVER_BASE_DIR + '/controller';

function load (app) {
    let routers = fs.readdirSync(baseDir).filter( item => item.endsWith('.js') );
    routers.forEach(function (item) {
        let router = require(path.join(baseDir, item));
        app.use(router.routes())
           .use(router.allowedMethods());
        debug(`Load router file ${item}`);
    });
}

exports.load = load;

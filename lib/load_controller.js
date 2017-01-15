'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 10:09:46
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 加载路由
 */

const _ = require('lodash');
const debug = require('debug')('cloverx:🍀 :loadController');
const fs = require('fs');
const path = require('path');

let baseDir = process.env.CLOVERX_BASE_DIR + '/controller';

function load (app, parent = '') {
    let routers = fs.readdirSync(path.join(baseDir, parent));

    routers.forEach(function (item) {
        let itemPath = path.join(baseDir, parent, item);
        let itemStats = fs.statSync(itemPath);

        if(itemStats.isDirectory()) {
            load(app, path.join(parent, item));
        } else if(itemStats.isFile() && item.endsWith('.js')) {
            debug(`Load file ${item}`);
            let router = require(path.join(baseDir, parent, item));
            // 设置前缀
            router.prefix((parent ? '/' + parent : parent) + '/' + _.trimEnd(item, '.js'));
            // 遍历 stack，打印 path
            router.stack.forEach(function(layer) {
                debug(`-------> ${layer.methods} - ${layer.path}`);
            });
            // 路由挂载
            app.use(router.routes())
               .use(router.allowedMethods());
        }
    });
}

module.exports = {
    load
};

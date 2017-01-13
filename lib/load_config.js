'use strict';
/**
 * <plusmancn@gmail.com> created at 2016.08.09 10:35:53
 *
 * copyright (c) 2016 souche.com, all rights
 * reserved.
 *
 * 配置文件加载模块
 * 优先级为 local.js > ${node_env}.js > common.js
 * local.js 在 git 仓库中被忽略，用于本地配置
 */

const debug = require('debug')('cloverx:🍀 :loadConfig');
const _ = require('lodash');
const path = require('path');

let baseDir = process.env.CLOVERX_BASE_DIR + '/config';
let localjs = {
    plugin: {}
};

try {
    localjs = require(path.join(baseDir, './local.js'));
} catch (e) {
    debug('local config not exists');
}

try {
    localjs.plugin = require(path.join(baseDir, './plugin.local.js'));
} catch (e) {
    debug('plugin.local config not exists');
}

// 加载插件配置
localjs.plugin = _.defaultsDeep(
    localjs.plugin,
    require(path.join(baseDir, `./plugin.${process.env.CLOVERX_ENV}.js`))
);

debug(`load config file in order: local.js, ${process.env.CLOVERX_ENV}.js, common.js`);
module.exports = _.defaultsDeep(
    localjs,
    require(path.join(baseDir, `./${process.env.CLOVERX_ENV}.js`)),
    require(path.join(baseDir, './common.js'))
);

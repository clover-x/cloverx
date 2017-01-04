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

const debug = require('debug')('clover:🍀 :loadConfig');
const _ = require('lodash');
const path = require('path');

let baseDir = process.env.CLOVER_BASE_DIR + '/config';
let localjs = {};
try {
    localjs = require(path.join(baseDir, './local.js'));
} catch (e) {
    debug('local config not exists');
}

module.exports = _.defaultsDeep(
    localjs,
    require(path.join(baseDir, `./${process.env.CLOVER_ENV}.js`)),
    require(path.join(baseDir, './common.js'))
);

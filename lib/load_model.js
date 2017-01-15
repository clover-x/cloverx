'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.05 13:06:44
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 加载 model
 */

const debug = require('debug')('cloverx:🍀 :loadModel');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

let baseDir = process.env.CLOVERX_BASE_DIR + '/model';

function load (cloverx, parent = '') {
    let models = fs.readdirSync(path.join(baseDir, parent));

    models.forEach(function (item) {
        let itemPath = path.join(baseDir, parent, item);
        let itemStats = fs.statSync(itemPath);

        if(itemStats.isDirectory()) {
            load(cloverx, path.join(parent, item));
        } else if(itemStats.isFile() && item.endsWith('.js')) {
            let model = require(path.join(baseDir, parent, item));
            let modelPath = parent + (parent ? '/' : '') + _.trimEnd(item, '.js');
            cloverx.model.set(modelPath, model);
            debug(`Load ${modelPath}`);
        }
    });
}

module.exports = {
    load
};

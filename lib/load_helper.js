'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.08 15:23:32
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 加载 helper
 */

const debug = require('debug')('cloverx:🍀 :loadHelper');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

let baseDir = process.env.CLOVERX_BASE_DIR + '/helper';

function load (cloverx, parent = '') {
    let helpers = fs.readdirSync(path.join(baseDir, parent));

    helpers.forEach(function (item) {
        let itemPath = path.join(baseDir, parent, item);
        let itemStats = fs.statSync(itemPath);

        if(itemStats.isDirectory()) {
            load(cloverx, item + '/');
        } else if(itemStats.isFile() && item.endsWith('.js')) {
            let helper = require(path.join(baseDir, parent, item));
            let helperPath = parent + _.trimEnd(item, '.js');
            cloverx.helper.set(helperPath, helper);
            debug(`Load ${helperPath}`);
        }
    });
}

exports.load = load;

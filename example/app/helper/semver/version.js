'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.08 15:07:01
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 版本号转换
 */

function versionToNumber (version) {
    let number = 0;
    let versionSplit = version.split('.');
    let length = versionSplit.length;
    for(let i = 0; i < length; i++) {
        number += versionSplit[i] * Math.pow(100, length - i -1);
    }

    return number;
}

exports.versionToNumber = versionToNumber;

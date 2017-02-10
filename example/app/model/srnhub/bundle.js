'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.07 18:17:03
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * bundle 操作
 */

const cloverx = require('../../../..');
const schemaBundle = cloverx.mysql.get('srnhub/bundle');

/**
 * 判断包名是否存在
 */
async function isExists (name) {
    let result = await schemaBundle.findOne({
        attributes: ['name', 'repository', 'version'],
        where: {
            'name': name
        },
        order: [
            ['versionNumber', 'desc']
        ],
        raw: true
    });

    return !!result;
}

/**
 * 上传新包
 */
async function create (name, platform, repository, version) {
    let exists = await schemaBundle.findOne({
        where: {
            name: name,
            version: version,
            platform: platform
        },
        raw: true
    });

    if(exists) {
        throw cloverx.Error.badParameter(`${name}-${platform}@${version} does exist`);
    }

    let result = await schemaBundle
        .build({
            name: name,
            platform: platform,
            repository: repository,
            version: version,
        })
        .save();

    return result;
}

/**
 *
 * 抛出错误
 */
function errMethod () {
    throw cloverx.Error.badParameter('duplicate name');
}

module.exports = {
    isExists,
    create,
    errMethod
};

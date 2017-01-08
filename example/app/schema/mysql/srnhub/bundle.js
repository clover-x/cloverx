'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.06 14:14:51
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * bundle 定义
 */
const cloverx = require('../../../../../');
const S = cloverx.S;

// 无需手动创建 createdAt 和 updatedAt 字段
module.exports = {
    fields: {
        bundleId: {
            primaryKey: true,
            type: S.INTEGER(11).UNSIGNED,
            // 如果为空，则默认值是将键名从 camelCase 转换为 underscore
            field: 'id',
            allowNull: false,
            comment: '包 ID',
        },
        name: {
            type: S.STRING(32),
            allowNull: false,
            comment: '包名称'
        },
        repository: {
            type: S.STRING(255),
            allowNull: false,
            comment: 'jsbundle 文件地址'
        },
        version: {
            type: S.STRING(32),
            allowNull: false,
            comment: '版本号，semver 规范'
        },
        versionNumber: {
            type: S.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: '数值转换值'
        }
    },
    comment: 'bundle 包信息'
};

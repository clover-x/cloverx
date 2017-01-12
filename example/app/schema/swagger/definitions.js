'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.10 19:10:43
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 数据类型定义
 */
module.exports = {
    Module: {
        type: 'object',
        description: 'rn 模块返回定义',
        properties: {
            name: {
                type: 'string',
                description: '模块名'
            },
            repository: {
                type: 'string',
                description: 'jsbundle 地址'
            },
            version: {
                type: 'string',
                description: '模块版本号'
            }
        }
    },
    StdResponse: {
        type: 'object',
        description: '搜车标准返回-模块包含',
        properties: {
            success: {
                type: 'boolean',
                description: '请求是否成功'
            },
            code: {
                type: 'number',
                description: '请求状态码，10000 为无错误',
                default: 10000
            },
            msg: {
                type: 'string',
                description: '错误描述'
            }
        }
    }
};

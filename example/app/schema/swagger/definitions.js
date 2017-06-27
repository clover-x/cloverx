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
    ModuleExists: {
        type: 'object',
        description: '模块是否存在',
        properties: {
            name: {
                type: 'string',
                description: '模块名'
            },
            exists: {
                type: 'boolean',
                description: '是否存在'
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
            },
            debug: {
                type: 'boolean',
                description: '是否输出调试信息'
            }
        }
    }
};

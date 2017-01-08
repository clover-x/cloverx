'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 11:19:22
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 大搜车标准输出
 */

// status => code
const STATUS_CODE_MAP_TO_CODE = {
    200: 10000,
    401: 10001,
    400: 10002,
    500: 10003,
    403: 20403,
    491: 10004
};

// code 预定义
const CODE_MAP = {
    // 系统错误
    10000: 'SUCCESS',
    10001: 'ERR_NOTLOGIN',
    10002: 'ERR_PARAM',
    10003: 'ERR_SYSTEM',
    10004: 'ERR_AUTH',
    20403: 'ERROR_FORBIDDEN'
};

function common(status, data, msg) {
    let code = STATUS_CODE_MAP_TO_CODE[status] || 10003;
    return {
        success: code === 10000,
        code: code,
        msg: msg || CODE_MAP[code] || CODE_MAP[10003],
        data: data || null
    };
}

function success(data) {
    return {
        success: true,
        code: 10000,
        msg: CODE_MAP[10000],
        data: data || null
    };
}

function format(ctx, next) {
    ctx.body = success(ctx.body);
    return next();
}

// 搜车标准请求返回模块
module.exports = {
    common: common,
    success: success,
    format: format
};

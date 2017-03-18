'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.12 16:44:17
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 插件配置-本地环境
 */

module.exports = {
    // 文档配置
    doc: {
        pathHash: '6def414e82cdd4bbeeb8e56b7543fe35',
        host: '127.0.0.1:7077'
    },
    mysql: {
        'srnhub': {
            database: 'srnhub',
            user: 'root',
            password: 'hackerliu',
            host: 'qcloud.plusman.cn',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    },
    redis: {
        'main': {
            port: 6379,
            host: 'qcloud.plusman.cn',
            family: 4,  // 4 (IPv4) or 6 (IPv6),,
            password: '063cfe39aedbb9724b59ddd1804f4f28',
            db: '0'
        }
    }
};

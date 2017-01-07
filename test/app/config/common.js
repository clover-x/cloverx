'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 10:46:59
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 通用配置文件
 */

module.exports = {
    mysql: {
        'srnhub': {
            database: 'srnhub',
            user: 'root',
            password: null,
            host: '127.0.0.1',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    }
};

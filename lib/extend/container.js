'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.07 21:57:18
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 对象容器,
 *
 * 对于 model 类型，保留原生 require 加载机制
 *
 */
const path = require('path');

class Container extends Map {
    constructor (type = 'key', baseDir = '') {
        super();
        this.type = type;
        this.baseDir = baseDir;
    }

    /**
     * 如果模块不存在，在启动时就报错
     * 如果是 model 类型，则尝试进行一次加载
     */
    get(key) {
        let value = super.get(key);

        if (!value && this.type === 'model') {
            try {
                value = require(path.join(this.baseDir, this.type, key));
            } catch (e) {
                // do nothing
            }
        }

        if(value === undefined) {
            throw new Error(`${this.type} with name ${key} does not exist`);
        }
        return value;
    }
}

module.exports = Container;

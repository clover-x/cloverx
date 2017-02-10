'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.07 21:57:18
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 对象容器
 */

class Container extends Map {
    constructor (type) {
        super();
        this.type = type || 'key';
    }

    /**
     * 如果模块不存在，在启动时就报错
     */
    get(key) {
        let value = super.get(key);
        if(value === undefined) {
            throw new Error(`${this.type} with name ${key} does not exist`);
        }
        return value;
    }
}

module.exports = Container;

'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.03.18 17:45:07
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 *  测试文件
 */

const cloverx = require('../../../../');

let router = new cloverx.Router();

/**jsdoc
 * redis 测试方法
 * @tags cli
 * @httpMethod get
 * @path /redis
 * @response null
 */
router.push({
    method: 'get',
    path: '/redis',
    processors: [
        async (ctx, next) => {
            let redis = cloverx.connection.get('redis').get('main');
            await redis.set('test:key:a', '123');
            ctx.body = await redis.get('test:key:a');
            return next();
        }
    ]
});

module.exports = router;

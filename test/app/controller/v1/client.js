'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.05 13:55:41
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 控制器示例
 */
const cloverx = require('../../../../');
const modelHello = cloverx.model.get('hello');
const modelClientVersion = cloverx.model.get('client/version');

let router = new cloverx.Router();

/**
 * curl -XGET 127.0.0.1:7077/v1/client/version | python -m json.tool
 */
router.push({
    desc: '获取 app 版本号',
    method: 'get',
    path: '/version',
    processors: [
        function (ctx, next) {
            ctx.body = {
                version: modelClientVersion(),
                hello: modelHello.getData()
            };
            return next();
        }
    ]
});

module.exports = router;

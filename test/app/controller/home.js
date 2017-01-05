'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 11:02:33
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 控制器示例
 */
const cloverx = require('../../../');

let V = cloverx.validator;
let router = new cloverx.Router({
    prefix: '/v1/home/'
});

/**
 * 请求示例
 * curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" -d 'username=petter' "http://127.0.0.1:7077/v1/home/user/537855/username?lastActive=1483435097181"
 */
router.push({
    desc: '更新用户姓名',
    method: 'put',
    path: 'user/:userId/username',
    params: {
        userId: V.number().required()
    },
    query: {
        lastActive: V.date().timestamp('javascript').required()
    },
    body: {
        username: V.string().min(6).required()
    },
    processors: [
        function (ctx, next) {
            ctx.body =  {
                raw: {
                    params: ctx.params,
                    query: ctx.query,
                    body: ctx.request.body
                },
                filter: ctx.filter
            };

            return next();
        }
    ]
});

module.exports = router;

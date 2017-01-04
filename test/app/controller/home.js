'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 11:02:33
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 控制器示例
 */
let clover = require('../../../');

let V = clover.validator;
let router = new clover.Router({
    prefix: '/v1/home/'
});

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

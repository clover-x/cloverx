'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.07 18:05:51
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * jsdoc 语法参考 https://github.com/clover-x/cloverx-doc
 *
 * 判断包是否存在
 */
const cloverx = require('../../../../../');
const modelSrnBundle = cloverx.model.get('srnhub/bundle');
const helperSemverVersion = cloverx.helper.get('semver/version');

let router = new cloverx.Router();
let V = cloverx.validator;

/**jsdoc
 * 判断包名是否存在
 * @tags client
 * @httpMethod get
 * @path /:name/exists
 * @param {string#path} name - 需要检查的包名, 允许字符 [a-z-]
 * @response @ModuleExists
 */
router.push({
    method: 'get',
    path: '/:name/exists',
    // 参数位置可选值：params, body, query
    params: {
        name: V.string().regex(/^[a-z-]+$/).max(20).required()
    },
    processors: [
        async (ctx, next) => {
            ctx.body = cloverx
                .checker
                .module('@ModuleExists')
                .checkAndFormat({
                    name: ctx.filter.params.name,
                    exists: true,
                    versionNumber: helperSemverVersion.versionToNumber('1.2.3')
                });
            return next();
        }
    ]
});

/**jsdoc
 * 错误测试
 * @tags cli
 * @httpMethod get
 * @path /error
 * @response null
 */
router.push({
    method: 'get',
    path: '/error',
    processors: [
        async (ctx, next) => {
            modelSrnBundle.errMethod();
            return next();
        }
    ]
});

module.exports = router;

'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.07 18:05:51
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 判断包是否存在
 */
const cloverx = require('../../../../');
const modelSrnBundle = cloverx.model.get('srnhub/bundle');
const helperSemverVersion = cloverx.helper.get('semver/version');

let router = new cloverx.Router();
let V = cloverx.validator;

router.push({
    desc: '判断包是否存在',
    method: 'get',
    path: '/:name/exists',
    params: {
        name: V.string().regex(/^[a-z-]+$/).max(20).required()
    },
    processors: [
        async (ctx, next) => {
            ctx.body = {
                name: ctx.filter.params.name,
                exists: await modelSrnBundle.isExists(ctx.filter.params.name),
                versionNumber: helperSemverVersion.versionToNumber('1.2.3')
            };
            return next();
        }
    ]
});

router.push({
    desc: '错误处理测试',
    method: 'get',
    path: '/error',
    processors: [
        (ctx, next) => {
            modelSrnBundle.errMethod();
            return next();
        }
    ]
});

module.exports = router;

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

let router = new cloverx.Router();
let V = cloverx.validator;

// 判断包是否存在
// @url GET:/v1/bundle/:name/exists
// params
    // @param {String} name - 包名称
// return {Object} {
    // name: {:name},
    // exists: {Boolean}
// }
//
router.push({
    desc: '判断包是否存在',
    method: 'get',
    path: '/:name/exists',
    params: {
        name: V.string().max(20).required()
    },
    processors: [
        async (ctx, next) => {
            ctx.body = {
                name: ctx.filter.params.name,
                exists: await modelSrnBundle.isExists(ctx.filter.params.name)
            };
            return next();
        }
    ]
});

module.exports = router;

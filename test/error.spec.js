'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.17 15:23:56
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * Error 对象测试
 */

const should = require('should');
const HttpError = require('../lib/base/error.js');

describe('#Error', function () {
    it('name should be HttpError', function () {
        let e = new HttpError();
        should.equal(e.name, 'HttpError');
    });

    it('error should with stack', function () {
        let e = new HttpError();
        (e.stack).should.match(/error\.spec\.js:21:17/);
    });
});

'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.07 23:06:40
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 容器测试
 */

const should = require('should');
const Container = require('../lib/extend/container.js');
let container;

describe('#extend#container', function () {
    before(function() {
        container =  new Container();
        container.set('key', 'value');
    });
    describe('Get a key that does not exist', function () {
        it('should throw key key_not_exists doet not exist', function () {
            (function() {
                container.get('key_not_exists');
            }).should.throw('key with name key_not_exists does not exist');
        });
    });

    describe('Get a key that exist', function () {
        it('should get value', function () {
            let result = container.get('key');
            should.equal(result ,'value');
        });
    });
});

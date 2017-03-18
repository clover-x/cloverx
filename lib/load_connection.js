'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.06 15:37:46
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 连接管理
 */

const debug = require('debug')('cloverx:🍀 :loadConnection');
const Sequelize = require('sequelize');
const Redis = require('ioredis');
const Container = require('./extend/container.js');

const CONNECTIONS = new Container();

function loadRedis(cloverx) {
    let configRedis = cloverx.config.plugin.redis;
    let redis = new Container('Redis Connection');
    CONNECTIONS.set('redis', redis);

    for(let key in configRedis) {
        if(!{}.hasOwnProperty.call(configRedis, key)) {
            continue;
        }

        redis.set(key, new Redis(configRedis[key]));

        debug(`Load redis database ${key}`);
    }
}

function loadMysql(cloverx) {
    let configMysql = cloverx.config.plugin.mysql;
    let mysql = new Container('Mysql Connection');
    CONNECTIONS.set('mysql', mysql);

    for(let key in configMysql) {
        if(!{}.hasOwnProperty.call(configMysql, key)) {
            continue;
        }
        let database = configMysql[key];

        mysql.set(key, new Sequelize(
            database.database,
            database.user,
            database.password || null,
            {
                host: database.host,
                dialect: 'mysql',
                pool: database.pool,
                define: {
                    timestamps: false,
                    freezeTableName: true
                },
                logging: require('debug')('cloverx:🍀 :mysql')
            }
        ));

        debug(`Load mysql database ${key}`);
    }
}

function load (cloverx) {
    cloverx.connection = CONNECTIONS;
    loadMysql(cloverx);
    loadRedis(cloverx);
}

module.exports = {
    load
};

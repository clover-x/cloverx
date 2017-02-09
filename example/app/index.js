'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.03 10:28:11
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 测试项目入口文件
 */

const yargv = require('yargs').argv;
// 变量可选值：development, production
process.env.NODE_ENV = (yargv.env || 'development').toLowerCase();

let server = require('../../').start({
    baseDir: __dirname,
    cloverEnv: process.env.NODE_ENV
});

// 启动 socket.io
const uuid = require('uuid');
const io = require('socket.io')(server);
const userSocketIdMap = new Map();
const socketIdUserMap = new Map();

io.on('connection', function (socket) {
    socket.on('peerMessage', function (data) {
        let to = userSocketIdMap.get(data.to);
        let from = userSocketIdMap.get(data.from);
        socket
            .to(to.socketId)
            .emit('message', {
                content: data.content,
                avatar: from.avatar,
                uuid: data.uuid || uuid.v4()
            });
    });

    socket.on('registry', function (data) {
        userSocketIdMap.set(data.userId, data);
        socketIdUserMap.set(data.socketId, data);

        console.log('new User', data);
    });
});

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledRejection', (err) => {
    console.error(err);
});

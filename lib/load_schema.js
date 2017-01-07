'use strict';
/**
 * <plusmancn@gmail.com> created at 2017.01.06 14:11:04
 *
 * Copyright (c) 2017 Souche.com, all rights
 * reserved.
 *
 * 加载数据库定义
 */

const debug = require('debug')('cloverx:🍀 :loadSchema');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

function fieldsAppendDate(fields, S) {
    if(!fields.createdAt) {
        fields.createdAt = {
            type: S.DATE,
            field: 'created_at',
            allowNull: false
        };
    }

    if(!fields.updatedAt) {
        fields.updatedAt = {
            type: S.DATE,
            field: 'updated_at',
            allowNull: false
        };
    }
}

/**
 *
 *`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
 */
function fieldsCamelToUnderscore (fields) {
    for(let key in fields) {
        if(!{}.hasOwnProperty.call(fields, key)) {
            continue;
        }
        let filedDef = fields[key];

        if(!filedDef.field) {
            filedDef.field = key.replace(/[A-Z]{1}/g, replacement => `_${replacement.toLowerCase()}`);
        }
    }
    
    return fields;
}

function loadMysql (cloverx) {
    let mysql = new Map();
    let baseDir = process.env.CLOVERX_BASE_DIR + '/schema/mysql';
    let databases = fs.readdirSync(baseDir);
    databases.forEach(function (item) {
        let itemPath = path.join(baseDir, item);
        let itemStats = fs.statSync(itemPath);

        if(itemStats.isDirectory()) {
            let schemaInstances = new Map();
            mysql.set(item, schemaInstances);

            let database = cloverx.connection.mysql.get(item);
            let schemas = fs.readdirSync(itemPath).filter(schema=> schema.endsWith('.js'));
            schemas.forEach(function (schema) {
                let schemaDef = require(path.join(itemPath, schema));
                let schemaName = _.trimEnd(schema, '.js');

                fieldsCamelToUnderscore(schemaDef.fields);
                fieldsAppendDate(schemaDef.fields, cloverx.S);
                let schemaInstance = database.define(schemaName, schemaDef.fields, {
                    comment: schemaDef.comment || ''
                });

                schemaInstances.set(schemaName, schemaInstance);
                debug(`Load schema mysql-${item}-${schemaName}`);
            });

            database.sync();
        }
    });

    cloverx.mysql = mysql;
}

function load (cloverx) {
    loadMysql(cloverx);
}

exports.load = load;
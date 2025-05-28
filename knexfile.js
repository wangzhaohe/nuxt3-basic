//-@+leo-ver=5-thin
//-@+node:swot.20250527112425.1: * @file knexfile.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import betterSqlite3 from 'better-sqlite3';

const shared = {
    client: 'better-sqlite3',
    driver: betterSqlite3,
    useNullAsDefault: true,
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './data/seeds'
    }
};

const development = {
    ...shared,
    connection: {
        filename: './data/dev.sqlite'
    }
};

const production = {
    ...shared,
    connection: {
        filename: './data/prod.sqlite'
    }
};

// CLI 要求使用默认导出方式
export default {
    development,
    production
};

//-@+others
//-@+node:swot.20250527112425.2: ** doc
//-@@language asciidoc
//-@+doc
//- 1. 生成 knexfile.js 配置文件
//-    * 执行 `knex init` 生成一个 knexfile.js 配置文件，用于定义数据库连接信息。
//-    * 只需要执行一次即可，实际上自己手动创建个 knexfile.js 文件就行了。
//-
//- 2. 迁移命令：
//-    * 生成迁移文件
//-
//-         knex migrate:make create_users_table
//-         # 生成迁移文件并补充完整内容，migrations 目录会自动生成
//-         # 例如 migrations/20250322014847_create_users_table.js
//-
//-    * 创建数据库 sqlite 存放的目录 data
//-
//-         mkdir data
//-         knex migrate:latest
//-         # 自动生成数据库文件 data/dev.sqlite
//-         # 查看数据库中已经生成了表 users
//-@-others
//-@+doc
//- ----
//-@-leo

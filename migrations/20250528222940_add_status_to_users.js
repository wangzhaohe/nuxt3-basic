//-@+leo-ver=5-thin
//-@+node:swot.20250528223039.1: * @file migrations/20250528222940_add_status_to_users.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export const up = function(knex) {
    return knex.schema.table('users', (table) => {
        // 增加是否启用字段 status，默认值为 active
        // table.enu('status', ['active', 'inactive'])
             // .defaultTo('active'); // sqlite3 不支持 enum
        table.string('status')
             .defaultTo('active')
             .checkIn(['active', 'inactive']);
    });
};

export const down = function(knex) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('status');  // 回滚时移除 status 字段
    });
};

// knex migrate:latest
//-@+doc
//- ----
//-@-leo

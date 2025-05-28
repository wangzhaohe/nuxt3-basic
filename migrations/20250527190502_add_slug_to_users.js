//-@+leo-ver=5-thin
//-@+node:swot.20250527190445.1: * @file migrations/20250527190502_add_slug_to_users.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export const up = function(knex) {
    return knex.schema.table('users', (table) => {
        table.string('slug').unique();  // 添加 slug 字段并设置唯一
    });
};

export const down = function(knex) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('slug');  // 回滚时移除
    });
};
//-@+doc
//- ----
//-@-leo

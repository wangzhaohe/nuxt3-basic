//-@+leo-ver=5-thin
//-@+node:swot.20250528223030.1: * @file migrations/20250528222920_change_users_table.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export const up = function(knex) {
    return knex.schema.table('users', (table) => {
        table.integer('roleId').unsigned();  // roleId 默认无值
        table.foreign('roleId').references('id').inTable('roles');
    });
};

export const down = function(knex) {
    return knex.schema.table('users', (table) => {
        table.dropForeign('roleId'); // 先移除外键
        table.dropColumn('roleId');  // 再删除字段
    });
};
//-@+doc
//- ----
//-
//- [source,console]
//- ----
//- pnpm run migrate 映射了下面的命令，参 package.json
//- knex migrate:latest 功能同上
//-
//- knex migrate:rollback  # 回滚最后一次迁移
//- knex migrate:rollback --all  # 回滚所有迁移（慎用！）
//- ----
//-@-leo

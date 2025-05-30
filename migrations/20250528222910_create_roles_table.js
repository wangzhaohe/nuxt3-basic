//-@+leo-ver=5-thin
//-@+node:swot.20250528223023.1: * @file migrations/20250528222910_create_roles_table.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export const up = function(knex) {
    return knex.schema
        .createTable('roles', (table) => {        // roloj
            table.increments('id');
            table.string('name', 255).notNullable();
            table.json('permissions').notNullable();
        });
};

export const down = function(knex) {
    return knex.schema.dropTable('roles');
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

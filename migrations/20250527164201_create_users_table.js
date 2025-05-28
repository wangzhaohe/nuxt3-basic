//-@+leo-ver=5-thin
//-@+node:swot.20250527164127.1: * @file migrations/20250527164201_create_users_table.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export const up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('username').notNullable().unique()
        table.string('password').notNullable()
        table.timestamps()  // 自动创建 `created_at` 和 `updated_at`
    })
};

export const down = function(knex) {
	  return knex.schema.dropTable('users')
};
//-@+doc
//- ----
//-
//- 执行 knex migrate:latest
//-
//- table.timestamps() 会在数据库中生成字段：
//-
//-     created_at DATETIME
//-     updated_at DATETIME
//-@-leo

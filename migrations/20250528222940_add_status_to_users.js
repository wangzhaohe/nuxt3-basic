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
//-
//- [discrete]
//- ==== 1. `checkIn` 的作用
//-
//- `checkIn` 是 Knex.js 提供的一个 *链式方法*，用于在数据库层级为某一字段添加一个 `CHECK` 约束，确保该字段的值属于给定的值集合。
//-
//- 例如：
//-
//- [source,js]
//- ----
//- table.string('status')
//-      .defaultTo('active')
//-      .checkIn(['active', 'inactive']);
//- ----
//-
//- 等价于 SQL：
//-
//- [source,sql]
//- ----
//- status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
//- ----
//-
//- 这个约束可以防止数据库插入非 `active` 或 `inactive` 的值。
//-
//- [discrete]
//- ==== 2. SQLite3 支持 `checkIn` 吗？
//-
//- 是的，**SQLite3 支持 `CHECK` 约束（包括 `IN` 子句）**。
//-
//- 示例在 SQLite 中是有效的：
//-
//- [source,sql]
//- ----
//- CREATE TABLE users (
//-     status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
//- );
//- ----
//-
//- 注意事项：
//-
//- - SQLite 从一开始就支持 `CHECK`。
//- - SQLite 不支持 `ENUM` 类型，因此使用 `checkIn` 模拟枚举是推荐方式。
//- - SQLite 的 `CHECK` 约束默认启用（除非你使用特殊构建选项禁用了它）。
//-
//- [discrete]
//- ==== 总结
//-
//- [options="header",cols="3a,3a,6a"]
//- |===
//- | 功能 | SQLite 是否支持 | 说明
//- | `checkIn` | ✅ 支持 | 对应 SQL 的 `CHECK (... IN (...))`
//- | `enum` (`table.enu`) | ❌ 不支持 | SQLite 无原生 ENUM 类型，需用字符串 + `checkIn` 模拟
//- |===
//-
//- [discrete]
//- ==== 最佳写法（兼容 SQLite）
//-
//- [source,js]
//- ----
//- table.string('status')
//-      .defaultTo('active')
//-      .checkIn(['active', 'inactive']);
//- ----
//-@-leo

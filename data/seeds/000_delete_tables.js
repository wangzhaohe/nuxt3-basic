//-@+leo-ver=5-thin
//-@+node:swot.20250528215755.7: * @file data/seeds/000_delete_tables.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import bcrypt from 'bcryptjs';

export async function seed(knex) {
    // Delete data from users & roles & articles tables.
    // NOTE: 这个要看实际应用了，追加数据则不用 del 表中的内容。
    await Promise.all([
        knex('articles').del(),  // articles use users
        knex('users').del(),     // users use roles
        knex('roles').del()      // so roles last deleted
    ]);
};
//-@+doc
//- ----
//-
//- 生成种子文件:
//-
//-   pnpm run seed.new 02_roles_users_articles
//-   对应命令为:
//-   knex seed:make 02_roles_users_articles
//-
//- 执行种子文件:
//-
//-   pnpm run seed  // 执行所有种子文件们
//-   pnpm run seed --specific 02_roles_users_articles.js  // 执行特定种子文件
//-   knex seed:run --specific 02_roles_users_articles.js  // 同上
//-@-leo

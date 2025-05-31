//-@+leo-ver=5-thin
//-@+node:swot.20250531092450.1: * @file data/seeds/101_users.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import bcrypt from 'bcryptjs';

export async function seed(knex) {
    //-@+others
    //-@+node:swot.20250531092450.2: ** delete data
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    await Promise.all([
        knex('users').del(),     // users use roles
    ]);
    //-@+doc
    //- ----
    //-
    //- Delete data from users & roles & articles tables.
    //-
    //- NOTE: 这个要看实际应用了，追加数据则不用 del 表中的内容。
    //-@+node:swot.20250531092450.4: ** insert users data
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    // const now = new Date().toISOString();  // 使用服务器当前时间
    const now = knex.fn.now();                // 使用数据库当前时间
    const hashedPassword = await bcrypt.hash("123456", 10);

    await knex('users').insert([
        { id: 1, username: 'admin' , password: hashedPassword, created_at: now, updated_at: now, roleId: 1 },
        { id: 2, username: 'author', password: hashedPassword, created_at: now, updated_at: now, roleId: 2 },
        { id: 3, username: 'swot'  , password: hashedPassword, created_at: now, updated_at: now, roleId: 3 },
    ]);
    //-@+doc
    //- ----
    //-
    //- 上面代码不指定 id 也是可以的。因为表 users id 是自增的。
    //-@-others
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
//-   pnpm run seed --specific 100_users.js  // 执行特定种子文件
//-   knex seed:run --specific 100_users.js  // 同上
//-@-leo

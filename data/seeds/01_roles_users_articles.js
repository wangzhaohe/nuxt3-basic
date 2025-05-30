//-@+leo-ver=5-thin
//-@+node:swot.20250528215755.7: * @file data/seeds/01_roles_users_articles.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import bcrypt from 'bcryptjs';

export async function seed(knex) {
    //-@+others
    //-@+node:swot.20250528215755.8: ** delete data
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    await Promise.all([
        knex('articles').del(),  // articles use users
        knex('users').del(),     // users use roles
        knex('roles').del()      // so roles last deleted
    ]);
    //-@+doc
    //- ----
    //-
    //- Delete data from users & roles & articles tables.
    //-
    //- NOTE: 这个要看实际应用了，追加数据则不用 del 表中的内容。
    //-@+node:swot.20250528215755.9: ** insert roles data
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    await knex('roles').insert([
        {
            id: 1,                         // <1>
            name: 'admin',  // 超级管理员
            permissions: JSON.stringify([  // <2>
                { action: 'manage', subject: 'all' }
            ])
        },
        {
            id: 2,                         // <1>
            name: 'member',  // 会员用户
            permissions: JSON.stringify([  // <2>
                { action: 'read', subject: 'Article' },
                { action: 'manage', subject: 'Article', conditions: { authorId: '${user.id}' }  // <3>
                }
            ])
        },
        {
            id: 3,                         // <1>
            name: 'normal',  // 普通用户
            permissions: JSON.stringify([  // <2>
                { action: 'read', subject: 'Article' }
            ])
        }
    ])
    //-@+doc
    //- ----
    //-
    //- <1> 上面代码不指定 id 也是可以的，但是下面的代码在插入用户时使用了指定死的 roleId。所以这里还是指定 user 的 id 为 1 和 2 为好，以免数据库自增 id 后对应不上了。
    //- <2> permissions 为文本字符串
    //- <3> 怎么解释这个模板字符串？ 后面有源码
    //-@+node:swot.20250528215755.10: ** insert users data
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
    //-@+node:swot.20250528215755.11: ** articles 的数据在下面的代码中插入
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
//-   pnpm run seed --specific 02_roles_users_articles.js  // 执行特定种子文件
//-   knex seed:run --specific 02_roles_users_articles.js  // 同上
//-@-leo

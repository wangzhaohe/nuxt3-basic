//-@+leo-ver=5-thin
//-@+node:swot.20250527181421.1: * @file data/seeds/01_users.js
//-@+doc
//- 操作命令
//-
//-     knex seed:run 执行所有
//-     knex seed:run --specific 01_users.js 执行单个
//-
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export async function seed(knex) {

    await knex('users').del();

    // const now = new Date().toISOString();  // 使用服务器时间
    const now = knex.fn.now(); // 使用数据库当前时间

    await knex('users').insert([
        { id: 1, username: 'User1', password: '123456', created_at: now, updated_at: now },
        { id: 2, username: 'User2', password: '123456', created_at: now, updated_at: now },
        { id: 3, username: 'User3', password: '123456', created_at: now, updated_at: now }
    ]);
}
//-@+doc
//- ----
//-@-leo

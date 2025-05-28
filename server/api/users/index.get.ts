//-@+leo-ver=5-thin
//-@+node:swot.20250527223001.1: * @file server/api/users/index.get.ts
//-@+doc
//- http :3000/api/users
//-
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
// 比如你想查询 `users` 表：
export default defineEventHandler(async (event) => {
    const users = await db<User>('users').select('*')
    return users
})
//-@+doc
//- ----
//-@-leo

//-@+leo-ver=5-thin
//-@+node:swot.20250529100255.1: * @file server/api/users/index.get.ts
//-@+doc
//- test
//-
//-     http :3000/api/users Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwiY3JlYXRlZF9hdCI6IjIwMjUtMDUtMzAgMTI6MzY6NTQiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wNS0zMCAxMjozNjo1NCIsInNsdWciOm51bGwsInJvbGVJZCI6MSwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNzQ4NjA4OTE0LCJleHAiOjE3NDkyMTM3MTR9.abIsKVZAa1_2fRLaoYkMUH8SYkohKmujQxRK2sq6rEI"
//-
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export default defineEventHandler(async (event) => {
    const { ability } = event.context;
    checkPermission(ability, 'read', 'User');    // 读表 Users 权限

    const users = await db<User>('users').select('*');
    return users;
})
//-@+doc
//- ----
//-@-leo

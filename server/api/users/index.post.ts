//-@+leo-ver=5-thin
//-@+node:swot.20250529100259.1: * @file server/api/users/index.post.ts
//-@+doc
//- test
//-
//-     http POST :3000/api/users Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwiY3JlYXRlZF9hdCI6IjIwMjUtMDUtMzAgMTI6MzY6NTQiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wNS0zMCAxMjozNjo1NCIsInNsdWciOm51bGwsInJvbGVJZCI6MSwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNzQ4NjA4OTE0LCJleHAiOjE3NDkyMTM3MTR9.abIsKVZAa1_2fRLaoYkMUH8SYkohKmujQxRK2sq6rEI" username=river password=123456
//-
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) =>
{
    const { ability } = event.context;
    checkPermission(ability, 'create', 'User');

    const body = await readBody(event);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const slug = `${body.username.toLowerCase().replace(/\s+/g, '-')}-${(uuidv4()).substring(0,8)}`;
    const role = await db('roles').select('id').where('name', 'normal').first();

    if (!role)
        throw createError({statusCode: 400,statusMessage: 'Role normal not found'});

    const [user] = await db<User>('users')
      .insert({
          username: body.username,
          password: hashedPassword,
          slug,
          roleId: role.id,
          created_at: db.fn.now(),  // 使用数据库当前时间，虽格式与 ISOString 不同，但仍是 UTC 时间
          updated_at: db.fn.now(),  // 所以需要注意显示格式的转换问题
      })
      .returning('*');  // if SQLite < 3.35，这一行不能用
                        // SELECT SQLITE_VERSION();  查看版本: 3.45.3
    return user;
});
//-@+doc
//- ----
//-@-leo

//@+leo-ver=5-thin
//@+node:swot.20250527223819.1: * @file server/api/users/index.post.ts
//@@language javascript
// Add slug and hash password when create user
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';


export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const slug = `${body.username.toLowerCase().replace(/\s+/g, '-')}-${(uuidv4()).substring(0, 8)}`;

    // body 中有 username 和 password，不要指定这样的字段，直接使用 body 即可
    const user = await db<User>('users').insert({
        ...body,
        password: hashedPassword,
        // 这里的 slug 是 uuidv4 的前 8 位
        // 这里的 slug 是 username 的小写字母和 - 连接起来
        slug: slug,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
    }).returning('*');

    return user[0];
});


//@+doc
// const now = db.fn.now();  // 使用数据库当前时间，但是格式与 ISOString 不一样，但仍然是 UTC 时间。
//
// http POST :3000/api/users username=Swot password=123
//@-leo

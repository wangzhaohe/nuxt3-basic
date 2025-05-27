//@+leo-ver=5-thin
//@+node:swot.20250527223814.1: * @file server/api/users/id/[id].put.ts
//@@language javascript
// 更新用户，如果没有 slug 则增加 slug
// 此路由多加了一个 /id/，就是为了 /api/users/[slug].get.ts 区分开

import { v4 as uuidv4 } from 'uuid';
import type { User } from '~/types/user'


export default defineEventHandler(async (event) => {

    const userId = getRouterParam(event, 'id');
    const body = await readBody(event);

    if (!userId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid user ID'
        });
    }
    const currentUser = await db<User>('users').where('id', userId).first();

    if (!currentUser) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found'
        });
    }
    // 准备更新数据
    const updatedData: { username: string; updated_at: string; slug?: string } = {
        username: body.username,  // 这个字段根据实际情况修改，因为用户名可能不允许修改
        updated_at: new Date().toISOString()
    };
    // 检查用户是否已有 slug，如果没有则生成一个
    if (!currentUser.slug) {
        const nameSlug = body.username.toLowerCase().replace(/\s+/g, '-');
        const uuidPart = uuidv4().substring(0, 8);
        updatedData.slug = `${nameSlug}-${uuidPart}`;
    }
    // 更新用户信息
    const updatedUser = await db<User>('users')
        .where('id', userId)
        .update(updatedData)
        .returning('*');

    return updatedUser[0];
});

//@+doc
// http put :3000/api/users/id/5 username=swotpp
//@-leo

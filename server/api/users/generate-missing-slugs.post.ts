//@+leo-ver=5-thin
//@+node:swot.20250527222331.1: * @file server/api/users/generate-missing-slugs.post.ts
//@@language javascript
// Add slug for all users
import { v4 as uuidv4 } from 'uuid'
import type { User } from '~/types/user'

export default defineEventHandler(async (event) => {
    try {
        // 查找所有没有 slug 的用户
        const usersWithoutSlug = await db('users')
            .whereNull('slug')
            .select('*')

        let updatedCount = 0

        // 为每个用户更新一个生成的 UUID 前8位作为 slug
        for (const user of usersWithoutSlug) {
            const nameSlug = user.username.toLowerCase().replace(/\s+/g, '-');
            const uuidPart = uuidv4().substring(0, 8);  // UUID 只取前8位
            const slug = `${nameSlug}-${uuidPart}`;

            // 更新用户的 slug
            await db<User>('users')
                .where({ id: user.id })
                .update({
                    slug,
                    updated_at: new Date().toISOString()
                })

            updatedCount++
        }

        return {
            success: true,
            message: `已为 ${updatedCount} 个用户更新了新的 UUID slug`,
            updatedCount
        }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: '生成 slug 失败',
            data: error
        })
    }
})

//@+doc
// 值得注意的是，虽然这个 api 不接收请求体数据，但它确实修改了数据库状态。
//
// 根据 RESTful 原则，修改资源状态的操作通常使用 POST、PUT 或 PATCH 方法，而不是 GET。
//
// GET 请求应该是幂等的（多次调用不会产生不同结果）。
//
// 因此，尽管技术上可以使用 GET，但保持为 POST 可能更符合 API 设计最佳实践，因为这个操作会修改数据库状态。
//@-leo

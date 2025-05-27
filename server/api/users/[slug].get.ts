//@+leo-ver=5-thin
//@+node:swot.20250527210134.1: * @file server/api/users/[slug].get.ts
//@@language javascript
// get user by slug
import type { User } from '~/types/user'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');
    const user = await db<User>('users').where({ slug }).first();

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found'
        });
    }
    return user;
});

//@+doc
// http :3000/api/users/user1-b53304f3
//
//@-leo

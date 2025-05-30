//-@+leo-ver=5-thin
//-@+node:swot.20250528215755.19: * @file server/middleware/auth.ts
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {

    let need_token = true;  // 默认所有 url 都需要检测 token

    /* 发现此处功能强大：前后端的 url 都可以被截获 */
    console.log('getRequestURL: ' + getRequestURL(event));  // 包含域名
    const current_url = getRequestURL(event).pathname;

    if (current_url.includes('/api/')) {  // 目前只判断后端 api 路由，前端路由先不判断
        for (const url of agordo.URL_WHITE_LIST) {
            if (current_url.includes(url)) {
                need_token = false;
                break;
            }
        }
        if (need_token === true) {        // 验证 token 是否有效
            //-@+others
            //-@+node:swot.20250530222358.1: ** 1 !authorization -- Missing token
            //-@+doc
            //- [source,typescript]
            //- ----
            //-@@c
            //-@@language typescript
            const authorization = getRequestHeader(event, 'authorization');
            console.log('authorization:', authorization);

            if (!authorization || !authorization.startsWith('Bearer ')) {
                throw createError({
                    statusCode: 401,
                    statusMessage: 'Missing token'
                });
            }
            //-@+doc
            //- ----
            //-@+node:swot.20250530222516.1: ** 2 !userInfo      -- Invalid token
            //-@+doc
            //- [source,typescript]
            //- ----
            //-@@c
            //-@@language typescript
            let userInfo: any;
            try {
                userInfo = jwt.verify(  // userInfo 是 JWT payload
                    authorization!.split('Bearer ')[1],
                    agordo.jwtSecretKey
                );
                console.log('userInfo:', userInfo);
            }
            catch (error) {  // 会被 composables/clientFetch.ts 捕获
                console.log('2025-05-01 23:09:05 error:', error);
                throw createError({
                    statusCode: 401,
                    statusMessage: 'Invalid token'
                });
            }
            //-@+doc
            //- ----
            //-@+node:swot.20250530222849.1: ** 3 !roleId        -- ability = null
            //-@+doc
            //- [source,typescript]
            //- ----
            //-@@c
            //-@@language typescript
            if (!userInfo.roleId){
                event.context.ability = null;
            }
            //-@+doc
            //- ----
            //-@+node:swot.20250530222949.1: ** 4 !user          -- user not found
            //-@+doc
            //- [source,typescript]
            //- ----
            //-@@c
            //-@@language typescript
            const user = await findUserBy({ id: userInfo.id });
            console.log('user:', user);

            if (!user) {
                throw createError({
                    statusCode: 401,
                    statusMessage: 'User not found'
                });
            }
            //-@+doc
            //- ----
            //-@+node:swot.20250530223221.1: ** 5 !ability       -- permissions error
            //-@+doc
            //- [source,typescript]
            //- ----
            //-@@c
            //-@@language typescript
            try {
                const ability = createAbility(user!.permissions);
                console.log('ability:', ability);
                event.context.user = user;
                event.context.ability = ability;
            }
            catch (error) {
                console.log('2025-05-01 23:09:36 error:', error);
                throw createError({
                    statusCode: 403,
                    statusMessage: 'Get permissions error'
                });
            }
            //-@+doc
            //- ----
            //-@-others
        }
    }
})
//-@+doc
//- ----
//-
//- server middleware 不用返回值，要么通过，要么抛出异常
//-
//- authorization: Bearer xxxxxx
//-@-leo

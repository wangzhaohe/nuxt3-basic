//-@+leo-ver=5-thin
//-@+node:swot.20250528215755.20: * @file server/api/auth/login.post.ts
//-@+doc
//- Use httpie test:
//-
//-     http :3000/api/auth/login nomo=admin1 pasvoto=123456
//-     http :3000/api/auth/login nomo=member1 pasvoto=123456
//-     http :3000/api/auth/login nomo=normal1 pasvoto=123456
//-
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import z from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IKorpo {  // I 指 interface
    nomo    : string;
    pasvorto: string;
}

export default defineEventHandler<{body: IKorpo}>(async (evento) => {

    // 打印看下 contentType 是什么：兼容对象和 Headers 实例两种情况
    let contentType: string | undefined;
    if (typeof evento.headers.get === 'function') {
        console.log('Using Headers.get() method');
        contentType = evento.headers.get('content-type') || undefined;
    } else {
        contentType = (evento.headers['content-type'] as string) || undefined;
    }
    console.log('Content-Type:', contentType);

    //-@+others
    //-@+node:swot.20250528215755.21: ** readBody
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    const korpo = await readBody(evento);
    console.log('korpo:', korpo);
    //-@+doc
    //- ----
    //-
    //- korpo 结构
    //-
    //-     korpo: {
    //-         nomo: 'admin',
    //-         pasvoto: 'xxxyyy'
    //-     }
    //-
    //- readBody 可自动处理 POST 请求中的：
    //-
    //- * x-www-form-urlencoded
    //- * json
    //-@+node:swot.20250528215755.22: ** zodParse 400
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    // 可以使用 zod 进行更加严格的校验
    const rezulto = z
        .object({
            nomo:    z.string().min(3),
            pasvoto: z.string().min(3),
        })
        .safeParse(korpo);

    // 用户上传数据格式不正确
    if (!rezulto.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad request',
        });
    }
    //-@+doc
    //- ----
    //-
    //- rezulto 结构
    //-
    //-     rezulto: {
    //-         success: true,
    //-         data: {
    //-             nomo: 'admin',
    //-             pasvoto: '输入的密码'
    //-         }
    //-     }
    //-@+node:swot.20250528215755.23: ** getUser 401
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    const uzantoElektu = await db("users")
         .where("username", rezulto.data.nomo)
         .where("status", "active");  // 启用状态

    // 未找到用户
    if (!uzantoElektu.length) {
        throw createError({
            statusCode: 401,
            statusMessage: 'User not found'
        });
    }
    //-@+doc
    //- ----
    //-@+node:swot.20250528215755.24: ** check password 401
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    const isMatch = await bcrypt.compare(
        rezulto.data.pasvoto,
        uzantoElektu[0].password
    );

    if (!isMatch) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        });
    }
    //-@+doc
    //- ----
    //-
    //- 用 bcrypt.compare() 异步方法来对 明文密码 和 加密密码 进行比较的，这是 bcrypt 提供的标准用法。
    //-
    //- 它会使用内部算法：
    //-
    //- 1. 从加密后的密码中提取 盐值 和加密强度。
    //- 2. 用这个盐值和用户输入的明文密码再次进行加密。
    //- 3. 比较新加密的结果与原始加密密码是否一致。
    //-
    //- 如果一致，返回 true，否则返回 false。
    //-@+node:swot.20250528215755.25: ** create token
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    const uzanto = {
        ...uzantoElektu[0],
        password: ''  // 去掉密码
    }

    const token = jwt.sign(
        uzanto,
        agordo.jwtSecretKey, {
            expiresIn: '7d',
            // expiresIn: '1m',  // only for test
        }
    );
    //-@+doc
    //- ----
    //-
    //- uzantoElektu 结构
    //-
    //-     uzantoElektu: [{
    //-         id: 1,
    //-         username: 'admin',
    //-         password: '$2a$10$mVE51pJNC3sR0gA6yR49U.X.vKCzQtwMCexsqRNC.yQTn9LXI00PW',
    //-         email: '',
    //-         roleId: 1,
    //-         avatar: null,
    //-         nickname: null,
    //-         introduction: null,
    //-         status: 1,
    //-         created_at: 2024-08-02T12:39:34.000Z,
    //-         updated_at: 2024-08-02T12:39:34.000Z
    //-     }]
    //-
    //- token Example
    //-
    //-     token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiIiwiZW1haWwiOiIiLCJyb2xlSWQiOjEsImF2YXRhciI6bnVsbCwibmlja25hbWUiOm51bGwsImludHJvZHVjdGlvbiI6bnVsbCwic3RhdHVzIjoxLCJjcmVhdGVkX2F0IjoiMjAyNC0wOC0wMlQxMjozOTozNC4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDgtMDJUMTI6Mzk6MzQuMDAwWiIsImlhdCI6MTc0MTg0OTM4MSwiZXhwIjoxNzQyNDU0MTgxfQ.tcmfoWOF-Ya0lfaa5GP2b-acbbAucMNfVcyvGbtMDeY
    //-@+node:swot.20250528215755.26: ** return token
    //-@+doc
    //- [source,typescript]
    //- ----
    //-@@c
    //-@@language typescript
    return {
        code: 0,
        msg: 'Login successful',
        data: {
           ...uzanto,
           token: 'Bearer ' + token
        }
    };
    //-@+doc
    //- ----
    //-@-others
});
//-@+doc
//- ----
//-@-leo

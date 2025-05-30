//-@+leo-ver=5-thin
//-@+node:swot.20250528215755.18: * @file server/utils/agordo.ts
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export default {
    /*
    //-@+<< 创建JWT安全秘钥 >>
    //-@+node:swot.20250529094321.1: ** << 创建JWT安全秘钥 >>
    //-@+doc
    //- [source,python]
    //- ----
    //-@@c
    //-@@language python
    import secrets
    secret_key = secrets.token_urlsafe(15)
    print("Generated JWT Secret Key:", secret_key)

    # 生成一个长度为 20 的 URL 安全密钥
    # token_urlsafe 的长度是基于字节的，每 3 个字节生成 4 个字符，加上可能的填充字符
    # 为了确保长度为 20，可以指定字节数，15 字节生成 20 个字符
    //-@+doc
    //- ----
    //-
    //- 比如结果为：lS4SOQtSSo1PXKcVgtH1
    //-@-<< 创建JWT安全秘钥 >>
    */

    // 应该考虑将重要的配置用系统变量来保存
    jwtSecretKey: 'lS4SOQtSSo1PXKcVgtH1',  // 前面使用 python 创建的密钥

    // 不需要进行 token 验证的 url，因为匹配第一个就会停止，所以大范围的 url 往后放
    URL_WHITE_LIST: [
        "/api/auth/login",
        // "/api/_content/",   // pnpm run build 时会测试服务器，之前安装了 content 模块导致的
        // "/api/uploads?action=config&&noCache=",     // UEditor 获取配置
    ]
};
//-@+doc
//- ----
//-@-leo

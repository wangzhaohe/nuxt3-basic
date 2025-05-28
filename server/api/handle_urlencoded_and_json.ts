//-@+leo-ver=5-thin
//-@+node:swot.20250528113522.1: * @file server/api/handle_urlencoded_and_json.ts
//-@+doc
//- 可以用 readBody(event) 解析 JSON 或普通表单数据（application/json 或 application/x-www-form-urlencoded），而 multipart/form-data 需要特殊处理，否则 readBody 会得到原始内容字符串。
//-
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // 这里 body 会包含表单字段，或者还有文件内容
    console.log('body:', body);
    return { body }
})
//-@+doc
//- ----
//-
//-@-leo

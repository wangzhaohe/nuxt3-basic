//-@+leo-ver=5-thin
//-@+node:swot.20250528093710.1: * @file server/api/handle-multipart.ts
//-@+doc
//- multipart/form-data 需要特殊处理，否则 readBody 会得到原始内容字符串。
//-
//- .install formidable
//- [source,shell]
//- ----
//- pnpm add formidable
//- ----
//-
//- 在 Formidable 3.5.4 中，`multiples` 参数已经被移除。在早期版本中（如 Formidable 1.x 和 2.x），`multiples` 参数用于指示是否支持多文件上传。如果设置为 `true`，则可以处理多个文件字段。但在 Formidable 3.x 版本中，该参数已被移除，不再需要显式设置，文件和字段的值默认总是数组。
//-
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import formidable from 'formidable';
import type { IncomingMessage } from 'http';

export default defineEventHandler(async (event) => {
    const form = formidable();
    const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
        form.parse(event.node.req as IncomingMessage, (err, fields, files) => {
            if (err) reject(err);
            else {
                console.log('fields:', fields);
                console.log('files:', files);
                resolve({ fields, files });
            }
        });
    });
    const username = fields.username;
    const password = fields.password;

    return {
        message: 'Form data received',
        fields,
        files,
        //- username,
        //- password,
    };
})
//-@+doc
//- ----
//-@-leo

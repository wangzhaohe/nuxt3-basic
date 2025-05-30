//-@+leo-ver=5-thin
//-@+node:swot.20250528215755.16: * @file server/utils/interpolate.ts
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import get from 'lodash/get'

export default (template: string, vars: object) => {

    return JSON.parse(template, (_, rawValue) => {  // 忽略 key，用 _ 代替

        if (rawValue[0] !== '$')
            return rawValue

        const name = rawValue.slice(2, -1)  // ${user.id} -> user.id
        const value = get(vars, name)

        if (typeof value === 'undefined')
            throw new ReferenceError(`Variable ${name} is not defined`)

        return value
    });
};
//-@+doc
//- ----
//-
//- 该函数只是个模板字符串的替换函数，在 JSON.parse 函数中从左到右，从里到外，一层一层进行判断。
//-@-leo

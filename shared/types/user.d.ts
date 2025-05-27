//@+leo-ver=5-thin
//@+node:swot.20250527195548.1: * @file shared/types/user.d.ts
//@@language javascript
// 更新 User 接口，添加 slug 字段

export interface User {
    id: number
    username: string
    password: string
    slug: string  // 添加 slug 字段
    created_at: string
    updated_at: string
}
//@-leo

//-@+leo-ver=5-thin
//-@+node:swot.20250529093531.1: * @file shared/types/user.d.ts
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import type { RawRuleOf } from '@casl/ability';
import type { AppAbility } from '../utils/appAbility';

export interface User {
    id         : number;
    username   : string;
    password   : string;
    created_at : string;
    updated_at : string;
    slug       : string;
    roleId     : string;                   // new added
    permissions: RawRuleOf<AppAbility>[];  // new added
}
//-@+doc
//- ----
//-
//- permissions: RawRuleOf<AppAbility>[] -> users 表中没有 permissions 字段，不要去对应表字段。
//-
//- 在后端服务中会用到此处定义的接口
//-@-leo

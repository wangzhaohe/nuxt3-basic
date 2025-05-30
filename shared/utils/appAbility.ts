//-@+leo-ver=5-thin
//-@+node:swot.20250528215755.12: * @file shared/utils/appAbility.ts
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import { createMongoAbility, type MongoAbility, type RawRuleOf, type ForcedSubject } from '@casl/ability'

export const actions = [ 'manage', 'create', 'read', 'update', 'delete' ] as const  // <1>
export const subjects = [ 'Article', 'User', 'all'] as const     // <1>

export type Abilities = [
    typeof actions[number],
    typeof subjects[number] | ForcedSubject<Exclude<typeof subjects[number], 'all'>>
];

export type AppAbility = MongoAbility<Abilities>

// 前面都是铺垫哈，这才是创建能力的函数
export const createAbility = (rules: RawRuleOf<AppAbility>[]) => createMongoAbility<AppAbility>(rules);

//-@+others
//-@+node:swot.20250528215755.13: ** Questions
//-@@language asciidoc
//-@+doc
//- . 后面的 as const 是为了让 TypeScript 知道这些是固定值（不是普通字符串数组）。
//-   * 不写 as const 会怎么样？
//-     ** 写了可以在后面直接定下来具体类型
//-
//- . import { createMongoAbility, MongoAbility, RawRuleOf, ForcedSubject } from '@casl/ability';
//-   * 用的是 sqlite3 database，为什么这里是 Mongo?
//-     ** 意思是支持 mongo 那样的语法查询
//-
//- . 不使用 ts 就没有这么麻烦了吧？
//-   * 对吗？
//-     ** 对的
//-
//- . 具体解释一下这个类型
//-   * 直接定义范围
//-
//-     export type Abilities = [
//-       typeof actions[number],
//-       typeof subjects[number] | ForcedSubject<...>
//-     ];
//-
//- . export type AppAbility = MongoAbility<Abilities>
//-   * 这又是干啥的？
//-     ** 定义个类型拥有 MongoAbility 的功能
//-@-others
//-@+doc
//- ----
//-
//- <1> 目前 actions & subjects 是写死在程序里的，有必要在数据库中创建表写成活的吗？
//-@-leo

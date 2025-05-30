//-@+leo-ver=5-thin
//-@+node:swot.20250528215755.15: * @file server/utils/findUserBy.ts
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export async function findUserBy(where: Partial<Record<keyof User, any>>)
                                            : Promise<User | undefined> {
    const result = await db<User>('users')  // <1>
        .innerJoin('roles', 'users.roleId', 'roles.id')
        .select('users.id', 'users.username', 'roles.permissions', { role: 'roles.name' })  // <2>
        .where(function () {
            for (const key in where) {
                this.andWhere(
                    `users.${key}`,
                    where[key as keyof typeof where]
                )
            }
        })
        .first()

    if (!result) {
        return undefined
    }
    const { permissions, ...user } = result  // <1>
    console.log('2025-05-30-214139 user:', user);
    user.permissions = interpolate(permissions, { user })   // <3>

    return user
}
//-@+doc
//- ----
//-
//- <1> 将 permissions 单独提出来（后面要用），其它值放入 user 对象中。
//- +
//- * [red]##此处还需要理解一下 db<User>('users') 是如被调用的？？？##
//-
//- <2> 将 name 重命名为 role，这样返回的值不会被误认为是 user.name（但实际上也没有 user.name）
//- +
//- * 注意不要选择 password 字段
//-
//- <3> 返回的 user 中有增加 user.permissions，所以 User interface 中增加了 permissions
//- +
//- * 注意 user 表中（不是 User interface）只有 id/email/role/password 4 个字段。
//-@-leo

//-@+leo-ver=5-thin
//-@+node:swot.20250528215755.17: * @file server/utils/permissions.ts
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
import type { AnyAbility, SubjectType } from '@casl/ability';
import { ForbiddenError } from '@casl/ability';

export function checkPermission(ability: AnyAbility,
                                action: typeof actions[number],
                                subject: SubjectType) {
    if (!actions.includes(action)) {  // 运行时校验 action 是否在允许范围
        throw createError({ statusCode: 400, statusMessage: `Unknown action: ${action}`});
    }
    try {
        ForbiddenError.from(ability).throwUnlessCan(action, subject);
    }
    catch (error) {
        if (error instanceof ForbiddenError) {
            const subjectType = typeof subject === 'string' ? subject : subject.constructor.name;
            throw createError({ statusCode: 403, statusMessage: `Forbidden: Cannot ${action} on ${subjectType}`});
        }
        throw error;  // if not ForbiddenError then throw it.
    }
}
//-@+doc
//- ----
//-@-leo

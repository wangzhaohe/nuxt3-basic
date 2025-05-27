//-@+leo-ver=5-thin
//-@+node:swot.20250527181843.1: * @file server/utils/db.ts
//-@@language typescript
import knex from 'knex';
import { fileURLToPath } from 'url'
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));
const knexfilePath = join(currentDir, '../../knexfile.js');
// 注意 es2022 才支持顶层 await
const knexfile = await import(knexfilePath);
const env = (process.env.NODE_ENV || 'development') as keyof typeof knexfile.default;

export default knex(knexfile.default[env]);

//-@+doc
//- Get database config from knexfile.js.
//-@-leo

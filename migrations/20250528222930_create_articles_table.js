//-@+leo-ver=5-thin
//-@+node:swot.20250528223034.1: * @file migrations/20250528222930_create_articles_table.js
//-@+doc
//- [source,typescript]
//- ----
//-@@c
//-@@language typescript
export const up = function(knex) {
    return knex.schema
        .createTable('articles', (table) => {     // artikoloj
            table.increments('id');
            table.string('title', 255).notNullable();
            table.string('description').notNullable();
            table.integer('authorId').unsigned().notNullable();

            table.foreign('authorId').references('id').inTable('users');
        });
};

export const down = function(knex) {
    return knex.schema.dropTable('articles');
};
//-@+doc
//- ----
//-@-leo

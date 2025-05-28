//@+leo-ver=5-thin
//@+node:swot.20250527195648.1: * @file pages/users/[slug].vue
//@+doc
// 在动态路由中使用 slug
//@@c
//@+others
//@+node:swot.20250527195648.3: ** template
//@+doc
// [source,typescript]
// ----
//@@c
//@@language typescript
<template lang="pug">
ul
    li(v-for="item in user" :key="index")
        | {{ item }}
</template>
//@+doc
// ----
//@+node:swot.20250527195648.2: ** script
//@+doc
// [source,typescript]
// ----
//@@c
//@@language typescript
<script setup lang="ts">

const route = useRoute();
const slug = route.params.slug;

// 通过 slug 获取用户数据
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data: user } = await useFetch(`/api/users/${slug}`);

</script>
//@+doc
// ----
//@-others
//@@language javascript
//@-leo

//@+leo-ver=5-thin
//@+node:swot.20250521205725.11: * @file app.vue
//@+doc
// 配置 element-plus 支持中文
//@@c
//@+others
//@+node:swot.20250521205725.12: ** template
//@@language javascript
<template lang="pug">
    NuxtLayout
        //- elementUI plus 支持中文
        el-config-provider(:locale="zhCn")
            NuxtPage
</template>
//@+node:swot.20250521205725.13: ** script
//@@language typescript
<script setup lang="ts">

// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

</script>
//@-others
//@@language javascript
//@-leo

//@+leo-ver=5-thin
//@+node:swot.20250521205725.11: * @file app.vue
//@+doc
//@@c
//@+others
//@+node:swot.20250521205725.12: ** template
//@+doc
// [source,typescript]
// ----
//@@c
//@@language typescript
<template lang="pug">
NuxtLayout
    div
        //- 这一行应该可以放在 layout 文件中，现在只是一个测试而已
        el-button.mb-2(@click="toggle") Switch Language
        p
        el-config-provider(:locale="locale")
            NuxtPage
</template>
//@+doc
// ----
//@+node:swot.20250521205725.13: ** script
//@+doc
// [source,typescript]
// ----
//@@c
//@@language typescript
<script setup lang="ts">

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en   from 'element-plus/es/locale/lang/en'

const language = ref('zh-cn')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const locale = computed(() => (
    language.value === 'zh-cn' ? zhCn : en))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toggle = () => {
    language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}

</script>
//@+doc
// ----
//@-others
//@@language javascript
//@-leo

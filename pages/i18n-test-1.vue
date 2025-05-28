//@+leo-ver=5-thin
//@+node:swot.20250528193211.1: * @file pages/i18n-test-1.vue
//@+doc
//@@c
//@+others
//@+node:swot.20250528193211.2: ** template
//@+doc
// [source,typescript]
// ----
//@@c
//@@language typescript
<template lang="pug">
div
    button(
        v-for="locale in locales"
        class="i18n-button"
        @click="setLocale(locale.code)"
    )
        | {{ locale.name }}

    h1
        | {{ $t('welcome') }}

    div
        //- 方式一：使用相对路径
        NuxtLink(to="about") about1 | 
        //- 方式二：使用绝对路径
        NuxtLink(:to="localePath('/about')") about2
    hr
    div 详细内容参: 
        a(href="https://i18n.nuxtjs.org/docs/getting-started/usage")
            | https://i18n.nuxtjs.org/docs/getting-started/usage
    div 参考版本为: v9.5.1
</template>
//@+doc
// ----
//@+node:swot.20250528193211.3: ** script
//@+doc
// [source,typescript]
// ----
//@@c
//@@language typescript
<script setup lang="ts">
    const { locales, setLocale } = useI18n();
    const localePath = useLocalePath();
</script>
//@+doc
// ----
//@+node:swot.20250528193211.4: ** style
//@+doc
// [source,scss]
// ----
//@@c
//@@language xml
<style lang="scss" scoped>

.i18n-button {
    margin-right: 5px;
}

</style>
//@+doc
// ----
//@-others
//@@language javascript
//@-leo

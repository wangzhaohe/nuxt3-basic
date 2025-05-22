//@+leo-ver=5-thin
//@+node:swot.20250522210755.1: * @file pages/tailwind/font_example.vue
//@+doc
// [source,html]
// ----
//@@c
//@@language javascript
<template lang="pug">
    div
        div 在下载《阿里巴巴普惠体》时，只选择了 魔方 Magic，所以其他字无效果
        br
        div(class="text-3xl bg-red-400") Hello World (该行无效果)
        br
        p 使用《阿里巴巴普惠体》 (该行无效果，下面的行都有效果)
        div(class="font-sans text-3xl") 魔方 Magic
        div(class="text-4xl") 魔方 Magic  (不指定 font-sans 也有效果，因为是全局的)
        div(class="font-sans text-4xl") 魔方 Magic
        div(class="font-sans text-5xl") 魔方 Magic
</template>
//@@language asciidoc
//@+doc
// ----
//@-leo

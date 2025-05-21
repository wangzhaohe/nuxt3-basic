//@+leo-ver=5-thin
//@+node:swot.20250521114411.1: * @file nuxt.config.ts
//@+doc
// [source,javascript,]
// ----
//@@c
//@@language javascript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },

    modules: [
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxt/scripts',
        '@nuxt/ui',
        '@nuxt/fonts',
        '@nuxt/eslint',
        '@element-plus/nuxt'    // new
    ],
    elementPlus: { /** Options */ },
    //@+others
    //@+node:swot.20250521115011.1: ** 1 关闭默认的 google 访问设置
    //@+doc
    // [source,javascript,]
    // ----
    //@@c
    //@@language javascript
    /* 因为默认会使用 google 的字体和图标，
       但是 node.js 不会走代理，可能访问不到 google 网站
    */

    // @nuxt/fonts 不使用 google fonts
    fonts: {
        provider: 'none', // 禁用默认字体提供商（如 Google Fonts）
    },

    // Nuxt UI 就不会再尝试加载 Google Fonts
    ui: {
        fonts: false
    },
    //@+doc
    // ----
    //@-others
});
//@+doc
// ----
//@-leo

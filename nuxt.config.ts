//@+leo-ver=5-thin
//@+node:swot.20250528191054.1: * @file nuxt.config.ts
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
      '@nuxtjs/i18n',  // new
    ],
    //@+others
    //@+node:swot.20250528191054.2: ** 1 关闭默认的 google 访问设置
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
    //@+node:swot.20250528193107.1: ** 2 i18n
    //@+doc
    // [source,typescript]
    // ----
    //@@c
    //@@language typescript
    i18n: {
        defaultLocale: 'en',
        locales: [
            { code: 'en', name: 'English', file: 'en.json' },
            { code: 'zh', name: '中文',     file: 'zh.json' },
            { code: 'ru', name: 'русский язык', file: 'ru.json' }
        ],
        bundle: {
            optimizeTranslationDirective: false
        }
    },
    //@+doc
    // ----
    //@-others
});
//@+doc
// ----
//@-leo

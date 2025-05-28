//@+leo-ver=5-thin
//@+node:swot.20250523151314.1: * @file components/Footer.vue
//@+doc
// 网站底部组件
//@@c
//@+others
//@+node:swot.20250523151314.2: ** template
//@+doc
// [source,scss]
// ----
//@@c
<template lang="pug">
    footer.bg-gray-800.text-gray-300.py-8.px-4
        div.container.mx-auto
            //@+others
            //@+node:swot.20250523151314.3: *3* 1. footer__top
            //@+doc
            // [source,scss]
            // ----
            //@@c
            section.flex.flex-wrap.justify-between
                //@+others
                //@+node:swot.20250523151314.4: *4* 1.1 服务链接
                //@+doc
                // [source,scss]
                // ----
                //@@c
                nav.w-full(class="md:w-1/4")

                    h6.font-bold.mb-4.text-gray-400
                        | Services

                    ul(class="space-y-2")
                        li
                            NuxtLink(to="/" class="link-hover")
                                | Shop & Contact
                        li
                            NuxtLink(to="/" class="link-hover")
                                | Return & Refund
                        li
                            NuxtLink(to="/" class="link-hover")
                                | Online Store
                        li
                            NuxtLink(to="/" class="link-hover")
                                | Terms & Conditions
                //@+doc
                // ----
                //@+node:swot.20250523151314.5: *4* 1.2 关于我们
                //@+doc
                // [source,scss]
                // ----
                //@@c
                nav.w-full(class="md:w-1/4")

                    h6.font-bold.mb-4.text-gray-400
                        | About Us

                    ul.space-y-2
                        li
                            NuxtLink(to="/" class="link-hover")
                                | Our Story
                        li
                            NuxtLink(to="/" class="link-hover")
                                | Blog
                        li
                            NuxtLink(to="/" class="link-hover")
                                | Contact Us
                //@+doc
                // ----
                //@+node:swot.20250523151314.6: *4* 1.3 社交媒体链接
                //@+doc
                // [source,scss]
                // ----
                //@@c
                nav.w-full(class="md:w-1/4")

                    h6.font-bold.mb-4.text-gray-400
                        | Follow Us

                    ul.space-y-2
                        li
                            a(href="#" class="link-hover")
                                | Facebook
                        li
                            a(href="#" class="link-hover")
                                | Instagram
                        li
                            a(href="#" class="link-hover")
                                | Twitter
                //@+doc
                // ----
                //@+node:swot.20250523151314.7: *4* 1.4 新闻订阅
                //@+doc
                // [source,scss]
                // ----
                //@@c
                div.w-full(class="md:w-1/4")

                    h6.font-bold.mb-4.text-gray-400
                        | Subscribe

                    form.flex.flex-col
                        input(
                            type="email" placeholder="Enter your email"
                            class="bg-gray-700 text-gray-300 \
                                   border border-gray-600 rounded-md p-2 mb-2"
                        )
                        button(
                            type="submit"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-bold \
                                   py-2 px-4 rounded-md"
                        )
                            | Subscribe
                //@+doc
                // ----
                //@-others
            //@+doc
            // ----
            //@+node:swot.20250523151314.8: *3* 2. footer__bottom 底部版权信息
            //@+doc
            // [source,scss]
            // ----
            //@@c
            section.mt-8.text-center.text-gray-400
                p
                    | &copy; 2025 Swotpp. All Rights Reserved
            //@+doc
            // ----
            //@-others
</template>
//@+doc
// ----
//@@tabwidth -2
//@+node:swot.20250523151314.9: ** script
//@+doc
// [source,scss]
// ----
//@@c
<script setup lang="ts"></script>
//@+doc
// ----
//@-others
//@@language javascript

//@-leo

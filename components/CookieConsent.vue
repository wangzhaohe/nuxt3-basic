//@+leo-ver=5-thin
//@+node:swot.20250523171027.1: * @file components/CookieConsent.vue
//@+doc
// 这是一个在页脚显示的 cookies 授权组件。
//@@c
//@+others
//@+node:swot.20250523171027.2: ** template
<template lang="pug">
UApp
    //@+others
    //@+node:swot.20250523171027.3: *3* 1 Cookie Consent Modal
    //@+doc
    // [source,scss]
    // ----
    //@@c
    //@@language typescript
    div(
        v-if="cookieConsentModalIsVisible"
        class="flex flex-col justify-between \
               fixed bottom-5 left-5 p-5 \
               w-11/12 sm:w-4/5 md:w-3/5 \
               bg-white rounded-lg shadow-lg z-50"
    )
        div.flex.justify-between.items-center.mb-2
            h2.m-0.text-lg.leading-tight
                | Manage Cookie Consent
            UButton(
                :padded="false"
                color="neutral"
                size="sm"
                variant="soft"
                icon="i-heroicons-x-mark-20-solid"
                @click="cookieConsentModalIsVisible = false"
            )

        p.text-sm.mb-5.leading-normal
            | Cookies give you a personalized experience. 
            | Cookie files help us to enhance your experience using our website, 
            | simplify navigation, keep our website safe and assist in our marketing efforts. 
            | For more information, review our 
            a#cookiePolicyLink.text-blue-500.no-underline(
                href="#"
                @click="cookiePolicyModalIsVisible = true"
            ) Cookie Policy.

        div.flex.justify-end.items-center.gap-2
            UButton(label="Accept" color="secondary" @click="acceptCookieConsent")
            UButton(label="Deny"   color="neutral"   @click="denyCookieConsent")
            UButton(label="Adjust" color="neutral"   @click="cookieSettingsModalIsVisible = true")
    //@+doc
    // ----
    //@+node:swot.20250523171027.4: *3* 2 Cookie Policy Modal
    //@+doc
    // [source,scss]
    // ----
    //@@c
    //@@language typescript
    div(
        v-if="cookiePolicyModalIsVisible"
        class="fixed z-50 left-0 top-0 w-full h-full \
               overflow-auto bg-black bg-opacity-50 \
               justify-center items-center"
    )
        div(
            class="bg-white mx-auto my-20 p-2 \
                   border border-gray-300 \
                   w-11/12 max-w-lg rounded-lg"
        )
            UCard
                template(#header)
                    div(class="flex justify-between items-center")
                        h2.m-0.text-lg.leading-none
                            | Cookie Policy
                        UButton(
                            :padded="false"
                            color="neutral"
                            size="sm"
                            variant="soft"
                            icon="i-heroicons-x-mark-20-solid"
                            @click="cookiePolicyModalIsVisible = false")

                p.pb-2
                    | Types of cookies:
                ul
                    li(class="flex flex-col sm:flex sm:flex-row sm:gap-2")
                        strong Necessary cookies:
                        span Essential for website functionality.
                    li(class="flex flex-col sm:flex sm:flex-row sm:gap-2")
                        strong Preferences cookies:
                        span Remember your settings.
                    li(class="flex flex-col sm:flex sm:flex-row sm:gap-2")
                        strong Statistics cookies:
                        span Help us improve our site.
                    li(class="flex flex-col sm:flex sm:flex-row sm:gap-2")
                        strong Marketing cookies:
                        span Used for personalized advertising.

                template(#footer)
                    p
                        | We use cookies to improve our services and customize your experience. 
                        | You can control the use of cookies through your browser settings and change your preferences at any time.
    //@+doc
    // ----
    //@+node:swot.20250523171027.5: *3* 3 Cookie Settings Modal
    //@+doc
    // [source,scss]
    // ----
    //@@c
    //@@language python
    div(v-if="cookieSettingsModalIsVisible"
        class="fixed z-50 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-50 justify-center items-center")
        div(class="bg-white mx-auto my-20 p-2 border border-gray-300 w-11/12 max-w-lg rounded-lg")
            UCard
                template(#header)
                    div(class="flex justify-between items-center")
                        h2(class="m-0 text-lg leading-tight")
                            | Cookie Settings
                        UButton(
                            :padded="false"
                            color="neutral"
                            size="sm"
                            variant="soft"
                            icon="i-heroicons-x-mark-20-solid"
                            @click="cookieSettingsModalIsVisible = false"
                        )
                form(id="cookieSettingsForm" @submit.prevent="saveCookieSettings")
                    div(class="flex justify-between items-center mb-2")
                        label(for="necessaryCookies" class="mr-2") Necessary Cookies
                        input(
                            type="checkbox" id="necessaryCookies" name="necessaryCookies" class="h-5 w-5 accent-blue-600"
                            v-model="necessaryCookies"
                        )
                    div(class="flex justify-between items-center mb-2")
                        label(for="preferencesCookies" class="mr-2") Preferences Cookies
                        input(
                            type="checkbox" id="preferencesCookies" name="preferencesCookies" class="h-5 w-5 accent-blue-600"
                            v-model="preferencesCookies"
                        )
                    div(class="flex justify-between items-center mb-2")
                        label(for="statisticsCookies" class="mr-2") Statistics Cookies
                        input(
                            type="checkbox" id="statisticsCookies" name="statisticsCookies" class="h-5 w-5 accent-blue-600"
                            v-model="statisticsCookies"
                        )
                    div(class="flex justify-between items-center mb-2")
                        label(for="marketingCookies" class="mr-2") Marketing Cookies
                        input(
                            type="checkbox" id="marketingCookies" name="marketingCookies" class="h-5 w-5 accent-blue-600"
                            v-model="marketingCookies"
                        )
                    UButton(label="Save" color="secondary" type="submit" block class="mt-5")
    //@+doc
    // ----
    //@-others
</template>
//@+node:swot.20250523171027.6: ** script
<script setup lang="ts">
//@+others
//@+node:swot.20250523171027.7: *3* ref var
//@+doc
// [source,javascript,]
// ----
//@@c
//@@language javascript
// flags used by v-if
const cookieConsentModalIsVisible = ref(false);
const cookiePolicyModalIsVisible = ref(false);
const cookieSettingsModalIsVisible = ref(false);

// 5 cookies
const maxAge = 60 * 60 * 24 * 30; // 30 days in seconds
const necessaryCookies = useCookie('necessaryCookies', { maxAge });
const preferencesCookies = useCookie('preferencesCookies', { maxAge });
const statisticsCookies = useCookie('statisticsCookies', { maxAge });
const marketingCookies = useCookie('marketingCookies', { maxAge });
const cookieConsent = useCookie('cookieConsent', { maxAge });

if (cookieConsent.value &&
   ['accepted', 'denied', 'partial'].includes(cookieConsent.value)) {
    cookieConsentModalIsVisible.value = false;
} else {
    cookieConsentModalIsVisible.value = true;
}
//@+doc
// ----
//@+node:swot.20250523171027.8: *3* accept & deny
//@+doc
// [source,javascript,]
// ----
//@@c
//@@language javascript
const acceptCookieConsent = () => {
    cookieConsent.value = 'accepted';
    cookieConsentModalIsVisible.value = false;
};

const denyCookieConsent = () => {
    cookieConsent.value = 'denied';
    cookieConsentModalIsVisible.value = false;
};
//@+doc
// ----
//@+node:swot.20250523171027.9: *3* saveCookieSettings
//@+doc
// [source,javascript,]
// ----
//@@c
//@@language javascript
// will be called by saveCookieSettings
const saveCookieConsent = () => {
    // 从 Adjust 选项来关联 cookieConsent 的三种情况
    // 1. 如果都选择 cookieConsent 设置为 accepted
    // 2. 如果都不选择 cookieConsent 设置为 denied
    // 3. 只选择部分 cookieConsent 设置为 partial
    const consent = [necessaryCookies.value, preferencesCookies.value, statisticsCookies.value, marketingCookies.value];
    const accepted = consent.every((value) => value);
    const denied = consent.every((value) => !value);
    cookieConsent.value = accepted ? 'accepted' : denied ? 'denied' : 'partial';
    cookieConsentModalIsVisible.value = false;
};

const saveCookieSettings = () => {
    // Save cookie settings
    necessaryCookies.value = necessaryCookies.value;
    preferencesCookies.value = preferencesCookies.value;
    statisticsCookies.value = statisticsCookies.value;
    marketingCookies.value = marketingCookies.value;

    cookieSettingsModalIsVisible.value = false;  // Close cookie settings modal
    saveCookieConsent();  // Update cookie consent based on the above settings
};
//@+doc
// ----
//@-others
</script>

//@+node:swot.20250523171027.10: ** style
//@+doc
// [source,scss]
// ----
//@@c
<style lang="scss" scoped>
</style>
//@+doc
// ----
//@-others
//@@language javascript
//@-leo

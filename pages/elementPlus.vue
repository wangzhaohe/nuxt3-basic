//@+leo-ver=5-thin
//@+node:swot.20250521205725.7: * @file pages/elementPlus.vue
//@+doc
//@@c
//@+others
//@+node:swot.20250521205725.8: ** template
<template lang="pug">
    div
        el-button(@click="ElMessage('hello')") button

        ElButton(:icon="ElIconEditPen" type="success") button

        LazyElButton(type="warning") lazy button

        el-icon
            ElIconDeleteFilled
        div
            el-date-picker(
                v-model="date"
                type="date"
                placeholder="选择日期"
            )
</template>
//@+node:swot.20250521205725.9: ** script
<script setup lang="ts">
    const date = ref('')
</script>
//@-others
//@@language javascript
//@-leo

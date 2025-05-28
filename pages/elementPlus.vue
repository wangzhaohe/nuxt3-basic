//@+leo-ver=5-thin
//@+node:swot.20250521205725.7: * @file pages/elementPlus.vue
//@+doc
//@@c
//@+others
//@+node:swot.20250521205725.8: ** template
//@+doc
// [source,typescript]
// ----
//@@c
//@@language typescript
<template lang="pug">
div
    el-button(@click="ElMessage('hello')") button

    ElButton(:icon="ElIconEditPen" type="success") button

    LazyElButton(type="warning") lazy button

    el-icon
        ElIconDeleteFilled

    el-date-picker(
        v-model="date"
        type="date"
        placeholder="选择日期"
    )

    el-table.mb-1(:data="[]")
    el-pagination(:total="100")
</template>
//@+doc
// ----
//@+node:swot.20250521205725.9: ** script
//@+doc
// [source,typescript]
// ----
//@@c
//@@language typescript
<script setup lang="ts">
    const date = ref('')
</script>
//@+doc
// ----
//@-others
//@@language javascript
//@-leo

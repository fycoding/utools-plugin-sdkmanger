<script setup>
import { onMounted, ref } from 'vue';
const sdkPath = ref("");

const open = async () => {
    sdkPath.value = await window.services.openDirectoryDialog();
    let config = window.services.getConfig();
    config.sdkPath = sdkPath.value;
    window.utools.db.put(config)
}
onMounted(() => {
    const config = window.services.getConfig();
    if (config) {
        sdkPath.value = config.sdkPath;
    }
});

</script>

<template>
    <div class="setting">
        <div class="label">SDK目录</div>
        <div class="setting-item">
            <input class="ipt" v-model="sdkPath" type="text" placeholder="请设置SDK文件夹">
            <div @click="open" class="select">选择</div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.setting {
    padding: 20px;
    font-size: 18px;

    .setting-item {
        display: flex;
        margin-top: 10px;

        .ipt {
            // margin-left: 10px;
            width: 300px;
        }

        .select {
            color: white;
            background-color: #409eff;
            padding: 3px 6px;
            border-radius: 4px;
            margin-left: 10px;
            cursor: pointer;
        }
    }
}
</style>
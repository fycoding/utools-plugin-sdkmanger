<template>
    <div class="version-list">
        <!-- 表头 -->
        <div class="version-header">
            <div class="item">序号</div>
            <div class="item">版本号</div>
            <div class="item">下载地址</div>
            <div class="item">操作</div>
        </div>
        <!-- 版本列表 -->
        <VersionItem
                     v-for="(item, index) in versionList"
                     :key="index + 1"
                     :index="index + 1"
                     :version="item.version"
                     :download-url="item.downloadUrl"
                     :current-version="currentVersion"
                     @download="handleDownload"
                     @switch="handleSwitch" />
        <!-- 状态栏 -->
        <div class="status-bar">
            {{ msg }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import VersionItem from './VersionItem.vue'

let msg = ref("-");
const currentVersion = "";
// 模拟数据
const versionList = ref([
    { version: '8', downloadUrl: 'https://d10.injdk.cn/openjdk/openjdk/8/openjdk-8u41-b04-windows-i586-14_jan_2020.zip' },
    { version: '11', downloadUrl: 'https://d10.injdk.cn/openjdk/openjdk/11/openjdk-11+28_windows-x64_bin.zip' },
    { version: '25', downloadUrl: 'https://d10.injdk.cn/openjdk/openjdk/25/openjdk-25_windows-x64_bin.zip' },
]);
const saveToPath = window.utools.getPath('downloads');

const services = window.services;
const env = services.env;

// 处理下载事件
const handleDownload = async (item) => {
    const versionPath = `${saveToPath + services.path.sep + item.version}`;
    if(services.path.existsSync(versionPath)) {
        setMsg(`当前版本:${item.version}已存在:${versionPath}`);
        return;
    }
    setMsg("下载中...");
    try {
        const file_name = `${versionPath}.zip`;
        await services.download(item.downloadUrl, file_name, (msg) => {
            setMsg(msg);
        });
        setMsg("下载完成，开始解压...");
        await services.uncompress(file_name);
        setMsg(`解压完成:${file_name}`);
    } catch (error) {
        setMsg(error);
    }
}

const setMsg = (txt) => {
    msg.value = txt;
}

// 处理切换事件
const handleSwitch = async (item) => {
    console.log('切换到版本:', item)
    let ret = await env.get('FLUTTER_HOME');
    console.log(ret);
}
</script>

<style lang="scss" scoped>
.version-list {
    margin: 20px auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

h2 {
    margin-bottom: 20px;
    color: #303133;
}

.version-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: #f5f7fa;
    border-radius: 4px;
    margin-bottom: 8px;
    font-weight: 600;
    color: #909399;
}

.version-header .item {
    padding: 0 12px;
}

.version-header .item:nth-child(1) {
    width: 60px;
}

.version-header .item:nth-child(2) {
    width: 120px;
}

.version-header .item:nth-child(3) {
    flex: 1;
}

.version-header .item:nth-child(4) {
    width: 160px;
}

.status-bar {
    // height: 40px;
    padding: 4px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #303133;
    color: white;
    left: 0;
}
</style>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import VersionList from "../../components/list/Index.vue"

let sdkPath = ref('');
const versionList = ref([
  { version: '8', downloadUrl: 'https://d10.injdk.cn/openjdk/openjdk/8/openjdk-8u41-b04-windows-i586-14_jan_2020.zip' },
  { version: '11', downloadUrl: 'https://d10.injdk.cn/openjdk/openjdk/11/openjdk-11+28_windows-x64_bin.zip' },
  { version: '17', downloadUrl: 'https://d10.injdk.cn/openjdk/openjdk/17/openjdk-17.0.1_windows-x64_bin.zip' },
  { version: '21', downloadUrl: 'https://d10.injdk.cn/openjdk/openjdk/21/openjdk-21.0.2_windows-x64_bin.zip' },
  { version: '25', downloadUrl: 'https://d10.injdk.cn/openjdk/openjdk/25/openjdk-25_windows-x64_bin.zip' },
]);


onMounted(() => {
  const config = window.services.getConfig();
  sdkPath.value = `${config.sdkPath}\\java`;
});


</script>

<template>
  <VersionList homeEnv="JAVA_HOME" :sdkPath="sdkPath" :versionList="versionList"></VersionList>
</template>

<style>
.hello {
  padding: 10px 28px;
}
</style>

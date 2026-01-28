<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import VersionList from "../../components/list/Index.vue"

let sdkPath = ref('');
const versionList = ref([
  {
    version: 'latest',
    downloadUrl: 'https://dl.google.com/android/repository/commandlinetools-win-13114758_latest.zip?hl=zh-cn'
  },
]);


onMounted(() => {
  const config = window.services.getConfig();
  sdkPath.value = `${config.sdkPath}\\android`;
});


</script>

<template>
  <VersionList homeEnv="ANDROID_HOME" :sdkPath="sdkPath" :versionList="versionList"></VersionList>
</template>

<style>
.hello {
  padding: 10px 28px;
}
</style>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import VersionList from "../../components/list/Index.vue"

let sdkPath = ref('');
const versionList = ref([
  {
    version: '3.10.7',
    downloadUrl: 'https://storage.flutter-io.cn/dart-archive/channels/stable/release/3.10.7/sdk/dartsdk-windows-x64-release.zip'
  },
  {
    version: '3.9.4',
    downloadUrl: 'https://storage.flutter-io.cn/dart-archive/channels/stable/release/3.9.4/sdk/dartsdk-windows-x64-release.zip'
  },
]);


onMounted(() => {
  const config = window.services.getConfig();
  sdkPath.value = `${config.sdkPath}\\dart`;
});


</script>

<template>
  <VersionList homeEnv="DART_HOME" :sdkPath="sdkPath" :versionList="versionList"></VersionList>
</template>

<style>
.hello {
  padding: 10px 28px;
}
</style>

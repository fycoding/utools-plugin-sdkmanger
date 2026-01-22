<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import VersionList from "../../components/list/Index.vue"

let sdkPath = ref('');
const versionList = ref([
  {
    version: '3.38.7',
    downloadUrl: 'https://storage.flutter-io.cn/flutter_infra_release/releases/stable/windows/flutter_windows_3.38.7-stable.zip'
  },
  {
    version: '3.27.1',
    downloadUrl: 'https://storage.flutter-io.cn/flutter_infra_release/releases/stable/windows/flutter_windows_3.27.1-stable.zip'
  },
]);


onMounted(() => {
  const config = window.services.getConfig();
  sdkPath.value = `${config.sdkPath}\\flutter`;
});


</script>

<template>
  <VersionList homeEnv="FLUTTER_HOME" :sdkPath="sdkPath" :versionList="versionList"></VersionList>
</template>

<style>
.hello {
  padding: 10px 28px;
}
</style>

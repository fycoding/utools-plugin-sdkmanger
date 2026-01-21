<script lang="ts" setup>
import { ref } from 'vue';
import VersionList from "../../components/list/Index.vue"
defineProps({
  enterAction: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <VersionList></VersionList>
</template>

<style>
.hello {
  padding: 10px 28px;
}
</style>

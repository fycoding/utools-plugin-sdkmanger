<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Java from "./pages/Java/index.vue";
import Dart from "./pages/Dart/index.vue";
import Flutter from "./pages/Flutter/index.vue";
import Index from "./pages/Index/index.vue";

const route = ref('')
const enterAction = ref({})

onMounted(() => {
  window.utools.onPluginEnter((action) => {
    route.value = action.code
    enterAction.value = action
  })
  window.utools.onPluginOut((isKill) => {
    route.value = ''
  })
})
</script>

<template>
  <template v-if="route === 'index'">
    <Index :enterAction="enterAction"></Index>
  </template>
  <template v-if="route === 'java'">
    <Java :enterAction="enterAction"></Java>
  </template>
  <template v-if="route === 'flutter'">
    <Flutter :enterAction="enterAction"></Flutter>
  </template>
  <template v-if="route === 'dart'">
    <Dart :enterAction="enterAction"></Dart>
  </template>
</template>

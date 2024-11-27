<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import {getEmitter} from "@/stores/authStore";
  import {onMounted, onUnmounted} from "vue";
  import router from "@/router/router";

  const emitter = getEmitter();

  onMounted(() => {
    emitter.on('navigate', navigate);
  });

  onUnmounted(() => {
    emitter.off('navigate', navigate);
  });

  const navigate = (route: any) => {
    router.push(route);
  }
</script>

<template>
  <RouterView />
</template>
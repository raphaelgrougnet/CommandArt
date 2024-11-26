<script setup lang="ts">
  import {useCategoryStore} from "@/stores/categoryStore";
  import {getEmitter} from "@/stores/authStore";
  import {computed, onMounted, onUnmounted} from "vue";
  import router from "@/router/router";
  import Navbar from "@/components/Navbar.vue";
  import type {NavbarLinks} from "@/types/NavbarLinks";

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

  const links: NavbarLinks[] = [
    {
      name: 'Accueil',
      route: 'home',
      isActive: true
    },
    {
      name: 'Catégories',
      route: 'categories',
      isActive: false,
      isForAdmin: true
    }
  ]
</script>

<template>
  <Navbar :links="links"/>
</template>

<style scoped>

</style>
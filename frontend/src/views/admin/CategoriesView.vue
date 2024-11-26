<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import type {NavbarLinks} from "@/types/NavbarLinks";
import {getEmitter} from "@/stores/authStore";
import CategoriesTable from "@/components/CategoriesTable.vue";
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

const links: NavbarLinks[] = [
  {
    name: 'Accueil',
    route: 'home',
    isActive: false
  },
  {
    name: 'Catégories',
    route: 'categories',
    isActive: true,
    isForAdmin: true
  }
]
</script>

<template>
  <Navbar :links="links" />
  <CategoriesTable />
</template>

<style scoped>

</style>
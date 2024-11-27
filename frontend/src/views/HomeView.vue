<script setup lang="ts">
  import Navbar from "@/components/Navbar.vue";
  import type {NavbarLinks} from "@/types/NavbarLinks";

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
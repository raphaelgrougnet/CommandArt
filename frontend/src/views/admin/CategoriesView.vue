<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import type {NavbarLinks} from "@/types/NavbarLinks";
import CategoriesTable from "@/components/CategoriesTable.vue";

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
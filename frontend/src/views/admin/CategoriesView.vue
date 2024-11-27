<script setup lang="ts">
  import Navbar from "@/components/Navbar.vue";
  import type {NavbarLinks} from "@/types/NavbarLinks";
  import CategoriesTable from "@/components/CategoriesTable.vue";
  import {Bookmark} from "lucide-vue-next";

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
  <h1 class="text-center fw-bold mt-4">Gérer les catégories</h1>
  <CategoriesTable />
</template>

<style scoped>

</style>
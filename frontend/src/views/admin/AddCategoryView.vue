<script setup lang="ts">
import type {NavbarLinks} from "@/types/NavbarLinks";
import Navbar from "@/components/Navbar.vue";
import AddCategoryForm from "@/components/AddCategoryForm.vue";

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
  <Navbar :links="links"/>
  <AddCategoryForm />
</template>

<style scoped>

</style>
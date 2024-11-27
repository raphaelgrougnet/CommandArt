<script setup lang="ts">
import {Palette, LogOut, UserPlus, User} from "lucide-vue-next";
  import {useAuthStore} from "@/stores/authStore";
  import type {NavbarLinks} from "@/types/NavbarLinks";
  import {computed} from "vue";

  const authStore = useAuthStore();

  const props = defineProps<{
    links: NavbarLinks[]
  }>();

  const normalLinks = computed(() => props.links.filter(link => !link.isForAdmin));
  const adminLinks = computed(() => props.links.filter(link => link.isForAdmin));
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-lg container rounded-4 mt-3 px-2">
    <div class="container-fluid">
      <div class="d-flex justify-content-start align-items-center gap-2">
        <Palette/>
        <RouterLink :to="{name: 'home'}" class="navbar-brand">CommandArt</RouterLink>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="link in normalLinks">
            <RouterLink :to="{name : link.route}" :class="link.isActive ? 'active nav-link' : 'nav-link'">{{link.name}}</RouterLink>
          </li>
          <li class="nav-item dropdown" v-if="authStore.currentUser?.isAdmin">
            <p :class="adminLinks.find(link => link.isActive) ? 'active nav-link dropdown-toggle m-0' : 'nav-link dropdown-toggle m-0'" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admin
            </p>
            <ul class="dropdown-menu">
              <li v-for="link in adminLinks">
                <RouterLink :to="{name: link.route}" class="dropdown-item">{{link.name}}</RouterLink>
              </li>
            </ul>
          </li>

        </ul>
      </div>
      <div class="ms-auto d-flex justify-content-center align-items-center" v-if="authStore.isLogged">
        <router-link to="/logout" class="btn"><LogOut /></router-link>
        <p class="m-0">{{authStore.currentUser?.username.toUpperCase()}}</p>
      </div>
      <div class="d-flex gap-2" v-else>
        <RouterLink :to="{name: 'login'}" class="btn btn-primary primaryBtn d-flex justify-content-center align-items-center gap-2"><User />Connexion</RouterLink>
        <RouterLink :to="{name: 'register'}" class="btn secondaryBtn d-flex justify-content-center align-items-center gap-2"><UserPlus />Inscription</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .secondaryBtn{
    border: none !important;
  }
</style>
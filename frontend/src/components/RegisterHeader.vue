<script setup lang="ts">
  import {User, Palette} from "lucide-vue-next";

  defineProps<{
    emailExists: boolean | null
  }>()
</script>

<template>
  <div class="containerHeader">
    <div class="d-flex justify-content-between align-items-center w-100 ">
      <div class="d-flex justify-content-center align-items-center gap-2">
        <Palette />
        <RouterLink :to="{name: 'home'}" class="fs-5 m-0 text-black text-decoration-none">
          CommandArt
        </RouterLink>
      </div>
      <RouterLink :to="{name : 'login'}" class="btn signup d-flex justify-content-center align-items-center gap-2">
        <User /> Connexion
      </RouterLink>
    </div>
    <div class="text-center titleContainer">
      <h2>Créer un compte</h2>
      <h3 class="fw-normal" v-if="emailExists === null || emailExists">
        Saisissez votre email ci-dessous pour créer votre compte
      </h3>
      <h3 class="fw-normal" v-else>
        Continuez à saisir vos informations personnelles
      </h3>
    </div>
  </div>
</template>

<style scoped>
  .containerHeader {
    margin-top: 5rem;

    .signup {

      &:hover {
        background-color: #f1f5f9;
      }
    }
    .titleContainer {
      padding-top: 4rem;

      h2 {
        font-size: 1.5rem;
        letter-spacing: -.025em;
        font-weight: 600;
      }

      h3 {
        font-size: .875rem;
        color: hsl(215.4 16.3% 46.9%);
      }
    }
  }
</style>
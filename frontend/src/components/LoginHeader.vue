<script setup lang="ts">
import {UserPlus, Palette} from "lucide-vue-next";

</script>

<template>
  <div class="containerHeader">
    <div class="d-flex justify-content-between align-items-center w-100 ">
      <div class="d-flex justify-content-center align-items-center gap-2">
        <Palette/>
        <h1 class="fs-4 m-0">CommandArt</h1>
      </div>
      <RouterLink :to='{name: "register"}' class="btn signup d-flex justify-content-center align-items-center gap-2"><UserPlus /> Inscription</RouterLink>
    </div>
    <div class="text-center titleContainer">
      <h2>Connectez-vous à votre compte</h2>
      <h3 class="fw-normal">Saisissez votre nom d'utilisateur et mot de passe ci-dessous pour vous connecter</h3>
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
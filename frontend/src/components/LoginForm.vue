<script setup lang="ts">

  import InputNoLabel from "@/components/InputNoLabel.vue";
  import {ref} from "vue";
  import { LoaderCircle } from 'lucide-vue-next';
  import {useAuthStore} from "@/stores/authStore";
  import router from "@/router/router";

  const authStore = useAuthStore()
  const isLoading = ref(false);
  const username = ref("")
  const password = ref("")
  const errors = ref<{
    username: string
    password: string
  }>({
    username: "",
    password: ""
  })

  function validateUsername(username: string) {
    const usernameRegex = /^[a-zA-Z0-9\-_ ]{3,50}$/;
    if (!username) {
      errors.value.username = "Veuillez saisir un nom d'utilisateur.";
      return false;
    }
    if (!usernameRegex.test(username)) {
      errors.value.username = "Le nom d'utilisateur doit contenir entre 3 et 50 caractères alphanumériques, tirets ou espaces.";
      return false;
    }
    errors.value.username = "";
    return true;
  }

  function validatePassword(password: string) {
    if (!password) {
      errors.value.password = "Veuillez saisir un mot de passe."
      return false;
    }
    errors.value.password = ""
    return true;
  }

  function validateForm() {
    errors.value = {
      username: "",
      password: "",
    }
    let hasError = false
    if (!validateUsername(username.value)) {
      hasError = true
    }
    if (!validatePassword(password.value)) {
      hasError = true
    }

    return !hasError
  }

  async function onSubmit(event: Event) {
    event.preventDefault()
    isLoading.value = true
    if (!validateForm()) {
      isLoading.value = false
      return
    }
    const success = await authStore.login(username.value, password.value)
    isLoading.value = false
    if (success == true) {
      await router.push({name: "home"})
    } else if (success == false) {
      errors.value.username = "Nom d'utilisateur ou mot de passe incorrect."
    }
  }
</script>

<template>
  <div>
    <form>
      <InputNoLabel
          label="Nom d'utilisateur"
          placeholder="Nom d'utilisateur"
          name="username"
          type="text"
          :disabled="false"
          :errors="errors.username"
          v-model.trim="username"
          class="input"
      />
      <InputNoLabel
          label="Mot de passe"
          placeholder="Mot de passe"
          name="password"
          type="password"
          :disabled="false"
          :errors="errors.password"
          v-model.trim="password"
          class="input"
      />
      <button :disabled="isLoading" class="btn btn-primary w-100 primaryBtn d-flex justify-content-center align-items-center gap-2" @click="onSubmit">
        <LoaderCircle v-if="isLoading" class="loaderSpin" /> Se connecter
      </button>
    </form>
  </div>
</template>

<style scoped>
  .input {
    margin-top: 3px;
  }

  .primaryBtn {
    margin-top: 5px;
  }
</style>
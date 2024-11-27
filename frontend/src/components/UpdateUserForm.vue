<script setup lang="ts">
  import type {User} from "@/types/User";
  import InputNoLabel from "@/components/InputNoLabel.vue";
  import {ref} from "vue";
  import {LoaderCircle} from "lucide-vue-next";
  import {useAuthStore} from "@/stores/authStore";

  const urlNominatim = "https://nominatim.openstreetmap.org/search";

  const props = defineProps<{
    user: User | null;
  }>();

  const authStore = useAuthStore();

  const username = ref(props.user!!.username);
  const address = ref(props.user!!.address);
  const password = ref("");
  const passwordConfirmation = ref("");

  const errors = ref({
    username: "",
    password: "",
    passwordConfirmation: "",
    address: ""
  });

  const isLoading = ref(false);

  function validateUsername() {
    const usernameRegex = /^[a-zA-Z0-9\-_ ]{3,50}$/;
    errors.value.username = ""
    if (!username.value || !usernameRegex.test(username.value)) {
      errors.value.username = "Le nom d'utilisateur doit contenir entre 3 et 50 caractères alphanumériques, tirets ou espaces."
      return false
    }
    return true
  }

  function validatePassword() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,}$/;
    errors.value.password = ""
    if (password.value && !passwordRegex.test(password.value)) {
      errors.value.password = "Le mot de passe doit contenir au moins une majuscule, un chiffre, un symbole et avoir au moins 8 caractères."
      return false
    }
    return true
  }

  function validatePasswordConfirmation() {
    errors.value.passwordConfirmation = ""
    if (password.value && password.value !== passwordConfirmation.value) {
      errors.value.passwordConfirmation = "Les mots de passe ne correspondent pas."
      return false
    }
    return true
  }

  async function validateAddress() {
    const addressRegex = /^[0-9]{1,5} [a-zA-ZÀ-ÿ0-9\-_ ]{3,50}$/;
    errors.value.address = ""
    if (!address.value || !addressRegex.test(address.value)) {
      errors.value.address = "L'adresse doit contenir un numéro de rue suivi d'un nom de rue."
      return false
    }
    try {
      const params = new URLSearchParams({
        q: address.value,
        format: "json",
        limit: "1"
      });
      const response = await fetch(`${urlNominatim}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        errors.value.address = "L'adresse n'a pas été trouvée."
        return false
      }

      const data = await response.json();
      if (data.length === 0) {
        errors.value.address = "L'adresse n'a pas été trouvée."
        return false
      }
    } catch (e) {
      console.error(e);
      errors.value.address = "L'adresse n'a pas été trouvée."
      return false
    }
    return true
  }

  async function validateForm() {
    return validateUsername() && validatePassword() && validatePasswordConfirmation() && await validateAddress()
  }

  async function onSubmit() {
    isLoading.value = true
    if (!await validateForm()) {
      isLoading.value = false
      return
    }

    await authStore.updateUser(
      username.value,
      address.value,
      password.value
    );

    isLoading.value = false
  }
</script>

<template>
  <form @submit.prevent="onSubmit">
    <InputNoLabel
        label="Courriel"
        placeholder="Courriel"
        name="email"
        type="email"
        :disabled="true"
        errors=""
        v-model="user!!.email"
        class="input"
    />
    <InputNoLabel
        label="Nom d'utilisateur"
        placeholder="Nom d'utilisateur"
        name="username"
        type="text"
        :disabled="isLoading"
        :errors="errors.username"
        v-model="username"
        class="input"
    />
    <InputNoLabel
        label="Adresse"
        placeholder="Numéro de rue, rue"
        name="address"
        type="text"
        :disabled="isLoading"
        :errors="errors.address"
        v-model="address"
        class="input"
    />
    <InputNoLabel
        label="Mot de passe"
        placeholder="Mot de passe"
        name="password"
        type="password"
        :disabled="isLoading"
        :errors="errors.password"
        v-model="password"
        class="input"
    />
    <InputNoLabel
        label="Confirmation du mot de passe"
        placeholder="Confirmation du mot de passe"
        name="passwordConfirmation"
        type="password"
        :disabled="isLoading"
        :errors="errors.passwordConfirmation"
        v-model="passwordConfirmation"
        class="input"
    />
    <div class="d-flex justify-content-end align-items-center gap-2 mt-3">
      <button type="button" class="btn secondaryBtn" data-bs-dismiss="modal">Fermer</button>
      <button type="submit" class="btn primaryBtn d-flex justify-content-center align-items-center gap-2">
        <LoaderCircle v-if="isLoading" class="loaderSpin" /> Sauvegarder
      </button>
    </div>

  </form>
</template>

<style scoped>
  .input {
    margin-bottom: 3px;
  }
</style>
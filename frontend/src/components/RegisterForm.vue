<script setup lang="ts">
import {LoaderCircle} from "lucide-vue-next";
import InputNoLabel from "@/components/InputNoLabel.vue";
import {ref} from "vue";
import {useAuthStore} from "@/stores/authStore";
import router from "@/router/router";

const props = defineProps<{
  emailExists: boolean | null
}>()

const authStore = useAuthStore()
const emit = defineEmits(['changeEmailExists'])
const isLoading = ref(false)
const email = ref("")
const username = ref("")
const password = ref("")
const passwordConfirmation = ref("")

const errors = ref({
  email: "",
  username: "",
  password: "",
  passwordConfirmation: ""
})

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  errors.value.email = ""
  if (!email.value || !emailRegex.test(email.value)) {
    errors.value.email = "Veuillez saisir un email valide."
    return false
  }
  return true
}

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
  if (!password.value || !passwordRegex.test(password.value)) {
    errors.value.password = "Le mot de passe doit contenir au moins une majuscule, un chiffre, un symbole et avoir au moins 8 caractères."
    return false
  }
  return true
}

function validatePasswordConfirmation() {
  errors.value.passwordConfirmation = ""
  if (!passwordConfirmation.value || password.value !== passwordConfirmation.value) {
    errors.value.passwordConfirmation = "Les mots de passe ne correspondent pas."
    return false
  }
  return true
}

function validateForm() {
  errors.value = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  }

  let hasError = false
  if (!validateUsername()) {
    hasError = true
  }
  if (!validatePassword()) {
    hasError = true
  }
  if (!validatePasswordConfirmation()) {
    hasError = true
  }
  return !hasError
}

async function onSubmitEmail() {
  isLoading.value = true
  if (!validateEmail()) {
    isLoading.value = false
    return
  }
  const response = await authStore.checkEmailExists(email.value)
  errors.value.email = response ? "Cet email est déjà utilisé." : ""
  emit('changeEmailExists', response)

  isLoading.value = false
}

async function onSubmitInfos() {
  isLoading.value = true
  if (!validateForm()) {
    isLoading.value = false
    return
  }
  const success = await authStore.register(email.value, username.value, password.value)
  isLoading.value = false
  if (success === true) {
    await router.push({name: 'home'})
  }

}
</script>

<template>
  <div>
    <form>

        <InputNoLabel
            label="Courriel"
            placeholder="Courriel"
            name="email"
            type="email"
            :disabled="false"
            :errors="errors.email"
            v-model.trim="email"
            v-if="emailExists === null || emailExists"
            class="input"
        />
        <InputNoLabel
            class="visually-hidden"
            label="Courriel"
            placeholder="Courriel"
            name="email"
            type="email"
            :disabled="false"
            :errors="errors.email"
            v-model.trim="email"
            v-else
        />

      <div v-if="emailExists === false">
        <InputNoLabel
            label="Nom d'utilisateur"
            placeholder="Nom d'utilisateur"
            name="username" type="text"
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
        <InputNoLabel
            label="Confirmation du mot de passe"
            placeholder="Confirmation du mot de passe"
            name="passwordConfirmation"
            type="password"
            :disabled="false"
            :errors="errors.passwordConfirmation"
            v-model.trim="passwordConfirmation"
            class="input"
        />
      </div>

      <button :disabled="isLoading" class="btn btn-primary w-100 submit d-flex justify-content-center align-items-center gap-2"
              @click.prevent="onSubmitEmail"
              v-if="emailExists === null || emailExists"
      >
        <LoaderCircle v-if="isLoading" class="loaderSpin" /> S'inscrire avec le courriel
      </button>
      <button :disabled="isLoading" class="btn btn-primary w-100 submit d-flex justify-content-center align-items-center gap-2"
              @click.prevent="onSubmitInfos"
              v-else
      >
        <LoaderCircle v-if="isLoading" class="loaderSpin" /> S'inscrire
      </button>
    </form>
  </div>
</template>

<style scoped>
  .input {
    margin-top: 3px;
  }

  .submit {
    background-color: #0f172a;
    border: #0f172a;
    transition: opacity 0.3s;
    margin-top: 5px;
    font-size: .875rem;
    height: 2.5rem;

    &:active {
      background-color: #0f172a;
    }

    &:hover {
      opacity: 0.9;
    }

    .loaderSpin {
      animation: spin 1s linear infinite;
    }
  }

  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
</style>
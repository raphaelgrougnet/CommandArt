<script setup lang="ts">

import InputNoLabel from "@/components/InputNoLabel.vue";
import {ref} from "vue";
import {LoaderCircle, BookmarkPlus} from "lucide-vue-next";

defineEmits(["cancelAddCategory"])

const regexNameCategory = /^[a-zA-Z0-9-_]{3,50}$/
const name = ref("");
const isLoading = ref(false);
const errors = ref({
  name: ""
})

function validateName() {
  if (!regexNameCategory.test(name.value)) {
    errors.value.name = "Le nom de la catégorie doit contenir entre 3 et 50 caractères alphanumériques, tirets et underscores."
    return false
  }
  errors.value.name = ""
  return true
}

function onSubmit() {
  if (!validateName()) {
    return
  }
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000)
}


</script>

<template>
  <div>
    <form class="w-100 d-flex gap-2">
      <InputNoLabel
          label="Nom de la catégorie"
          placeholder="Nom de la catégorie"
          name="categoryName"
          type="text"
          :disabled="isLoading"
          errors=""
          v-model.trim="name"
          class="flex-grow-1"
      />
      <div class="d-flex gap-2">
        <button :disabled="isLoading" class="btn btn-primary w-100 submit d-flex justify-content-center align-items-center gap-2"
                @click.prevent="onSubmit"
        >
          <LoaderCircle v-if="isLoading" class="loaderSpin" /> <BookmarkPlus v-else /> Ajouter
        </button>
        <button :disabled="isLoading" class="btn btn-secondary w-100 cancel" @click="$emit('cancelAddCategory')">Annuler</button>
      </div>
    </form>
    <span v-if="errors.name.length > 0" class="text-danger text-left w-100 errors">{{ errors.name }}</span>
  </div>


</template>

<style scoped>
.submit {
  background-color: #0f172a;
  border: 1px solid #0f172a;
  transition: opacity 0.3s;

  &:active {
    background-color: #0f172a;
    border: 1px solid #0f172a;
  }

  &:hover {
    opacity: 0.9;
  }
}

.cancel {
  background-color: transparent;
  color: black;
  transition: background-color 0.3s;

  &:active {
    color: black;
    background-color: #f1f1f1;
  }

  &:hover {
    background-color: #f1f1f1;
  }
}

.errors {
  font-size: .75rem;
  margin-top: 3px;
}

.loaderSpin {
  animation: spin 1s linear infinite;
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
<script setup lang="ts">
  import InputNoLabel from "@/components/InputNoLabel.vue";
  import {ref} from "vue";
  import {Ban, BookmarkPlus, LoaderCircle} from "lucide-vue-next";
  import {useCategoryStore} from "@/stores/categoryStore";

  const emit = defineEmits(["cancelAddCategory"])

  const categoryStore = useCategoryStore();

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

  async function onSubmit() {
    if (!validateName()) {
      return
    }
    isLoading.value = true;
    await categoryStore.addCategory(name.value)
    isLoading.value = false;
    emit("cancelAddCategory")
    name.value = "";
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
        <button :disabled="isLoading" class="btn btn-primary w-100 primaryBtn d-flex justify-content-center align-items-center gap-2"
                @click.prevent="onSubmit"
        >
          <LoaderCircle v-if="isLoading" class="loaderSpin" /> <BookmarkPlus v-else /> Ajouter
        </button>
        <button :disabled="isLoading" class="btn btn-secondary w-100 secondaryBtn" @click="emit('cancelAddCategory')">
          <Ban/>
          Annuler
        </button>
      </div>
    </form>
    <span v-if="errors.name.length > 0" class="text-danger text-left w-100 errors">{{ errors.name }}</span>
  </div>
</template>

<style scoped>
.errors {
  font-size: .75rem;
  margin-top: 3px;
}

</style>
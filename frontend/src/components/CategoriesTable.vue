<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useCategoryStore} from "@/stores/categoryStore";
import InputNoLabel from "@/components/InputNoLabel.vue";
import {Bookmark, BookmarkPlus, Check, LoaderCircle, Pencil, PencilOff, Trash2} from "lucide-vue-next";
import AddCategoryForm from "@/components/AddCategoryForm.vue";
import type {Category} from "@/types/Category";

const categoryStore = useCategoryStore();
const searchQuery = ref("");
const isFetching = ref(false);
const isAdding = ref(false);
const isDeleteLoading = ref(false);
const isEditLoading = ref(false);
const editingCategoryId = ref(null as string | null);
const originalCategoryName = ref("");

const errors = ref({
  name: ""
});

const categories = computed(() => {
  return categoryStore.categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
  );
});

const validateName = (name: string) => {
  const regexNameCategory = /^[a-zA-Z0-9-_]{3,50}$/;
  if (!regexNameCategory.test(name)) {
    errors.value.name = "Le nom de la catégorie doit contenir entre 3 et 50 caractères alphanumériques, tirets et underscores.";
    return false;
  }
  errors.value.name = "";
  return true;
};

const deleteCategory = async (categoryId: string) => {
  isDeleteLoading.value = true;
  await categoryStore.deleteCategory(categoryId);
  isDeleteLoading.value = false;
};

const editCategory = async (categoryId: string, categoryName: string) => {
  if (!validateName(categoryName)) {
    return;
  }
  isEditLoading.value = true;
  await categoryStore.editCategory(categoryId, categoryName);
  isEditLoading.value = false;
  editingCategoryId.value = null;
};

const startEditCategory = (categoryId: string, categoryName: string) => {
  originalCategoryName.value = categoryName;
  editingCategoryId.value = categoryId;
};

const cancelEditCategory = (category: Category) => {
  category.name = originalCategoryName.value;
  errors.value.name = "";
  editingCategoryId.value = null;
};

onMounted(async () => {
  isFetching.value = true;
  await categoryStore.fetchCategories()
  isFetching.value = false;
});
</script>

<template>
  <h1 class="text-center fw-bold mt-4">Gérer les catégories <Bookmark :size="36" /></h1>
  <div class="container mt-3">
    <div class="d-flex gap-2 flex-column flex-md-row" v-if="!isAdding">
      <InputNoLabel
          label="Rechercher des catégories"
          placeholder="Rechercher des catégories"
          name="searchCategories"
          type="text"
          :disabled="false"
          errors=""
          v-model.trim="searchQuery"
          class="flex-grow-1"
      />
      <p class="btn btn-primary primaryBtn m-0 d-flex justify-content-center align-items-center gap-2"
         @click="isAdding=true">
        <BookmarkPlus/>
        Ajouter une catégorie
      </p>
    </div>
    <AddCategoryForm v-else @cancel-add-category="isAdding=false"/>
    <p v-if="isFetching" class="text-center mt-3">
      <LoaderCircle class="loaderSpin" /> Chargement des catégories...
    </p>
    <table class="table mt-3" v-else-if="categories.length">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nom</th>
        <th scope="col" class="actions-column">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(category, index) in categories" :key="category.id">
        <th scope="row">{{ index + 1 }}</th>
        <td v-if="editingCategoryId !== category.id">{{ category.name }}</td>
        <td v-else>
          <InputNoLabel
              label="Modifier le nom de la catégorie"
              placeholder="Modifier le nom de la catégorie"
              name="editCategoryName"
              type="text"
              :disabled="isEditLoading"
              :errors="errors.name"
              v-model="category.name"
          />
        </td>
        <td class="actions-column" v-if="editingCategoryId !== category.id">
          <div class="d-flex justify-content-end align-items-center gap-2">
            <button class="btn btn-primary primaryBtn" @click="startEditCategory(category.id, category.name)">
              <Pencil/>
              Modifier
            </button>
            <button class="btn btn-secondary secondaryBtn" @click="deleteCategory(category.id)">
              <LoaderCircle v-if="isDeleteLoading" class="loaderSpin"/>
              <Trash2 v-else/>
              Supprimer
            </button>
          </div>
        </td>
        <td class="actions-column" v-else>
          <div class="d-flex justify-content-end align-items-center gap-2">
            <button class="btn btn-primary primaryBtn" @click="editCategory(category.id, category.name)">
              <LoaderCircle v-if="isDeleteLoading" class="loaderSpin"/>
              <Check v-else/>
              Valider
            </button>
            <button class="btn btn-secondary secondaryBtn" @click="cancelEditCategory(category)">
              <PencilOff/>
              Annuler
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else class="text-center mt-3">
      <p class="fs-3">Aucune catégories disponible...</p>
    </div>
  </div>
</template>

<style scoped>
.actions-column {
  width: 300px;
  text-align: center;
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
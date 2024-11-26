<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import {useCategoryStore} from "@/stores/categoryStore";
import InputNoLabel from "@/components/InputNoLabel.vue";
import {BookmarkPlus, BookmarkMinus, Bookmark, BookmarkCheck, LoaderCircle} from "lucide-vue-next";
import AddCategoryForm from "@/components/AddCategoryForm.vue";

const categoryStore = useCategoryStore();
const searchQuery = ref("");
const isFetching = ref(false);
const isAdding = ref(false);

const categories = computed(() => {
  return categoryStore.categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
  );
});

const deleteCategory = (categoryId: number) => {
  // categoryStore.deleteCategory(categoryId);
  alert('Delete category with id: ' + categoryId);
};

onMounted(() => {
  isFetching.value = true;
  categoryStore.fetchCategories().then(() => {
    isFetching.value = false;
  });
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
      <p class="btn btn-primary addCategory m-0 d-flex justify-content-center align-items-center gap-2" @click="isAdding=true"><BookmarkPlus /> Ajouter une catégorie</p>
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
        <td>{{ category.name }}</td>
        <td class="actions-column d-flex justify-content-center align-items-center gap-2">
          <button class="btn btn-danger" @click="deleteCategory(category.id)"><BookmarkMinus /> Supprimer</button>
          <button class="btn btn-primary"><BookmarkCheck /> Modifier</button>
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

.addCategory {
  background-color: #0f172a;
  border: 1px solid #0f172a;
  transition: opacity 0.3s;

  &:active {
    background-color: #0f172a;
  }

  &:hover {
    opacity: 0.9;
  }
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
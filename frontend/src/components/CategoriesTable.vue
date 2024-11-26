<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import {useCategoryStore} from "@/stores/categoryStore";
import InputNoLabel from "@/components/InputNoLabel.vue";
import {BookmarkPlus, BookmarkMinus, Bookmark} from "lucide-vue-next";

const categoryStore = useCategoryStore();
const searchQuery = ref("");

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
  categoryStore.fetchCategories();
});
</script>

<template>
  <h1 class="text-center fw-bold mt-4">Gérer les catégories <Bookmark :size="36" /></h1>
  <div class="container mt-3">
    <div class="d-flex gap-2 flex-column flex-md-row">
      <InputNoLabel
          label="Rechercher des catégories"
          placeholder="Rechercher des catégories"
          name="searchCategories"
          type="text"
          :disabled="false"
          errors=""
          v-model="searchQuery"
          class="flex-grow-1"
      />
      <router-link to="/admin/category/add" class="btn btn-primary addCategory"><BookmarkPlus /> Ajouter une catégorie</router-link>
    </div>

    <table class="table mt-3" v-if="categories.length">
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
        <td class="actions-column">
          <button class="btn btn-danger" @click="deleteCategory(category.id)"><BookmarkMinus /> Supprimer</button>
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
  width: 150px;
  text-align: center;
}

.addCategory {
  background-color: #0f172a;
  border: #0f172a;
  transition: opacity 0.3s;
  height: 2.5rem;

  &:active {
    background-color: #0f172a;
  }

  &:hover {
    opacity: 0.9;
  }
}
</style>
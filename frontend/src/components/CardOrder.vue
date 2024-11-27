<script setup lang="ts">
  const props = defineProps<{
    title: string,
    cost: string,
    category: string,
    date: string,
    description: string
  }>();
</script>

<template>
  <div class="card shadow border-0 rounded-3">
    <div class="card-body">
      <h5 class="card-title fw-bold">{{props.title}} - [{{props.category}}]</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${{ props.cost }} - {{ props.date }}</h6>
      <p class="card-text">{{props.description}}</p>
      <div class="d-flex gap-2 justify-content-start align-items-center">
        <a href="#" class="card-link btn primaryBtn">Voir la commande</a>
        <span class="text-danger">Vous êtes innéligible</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
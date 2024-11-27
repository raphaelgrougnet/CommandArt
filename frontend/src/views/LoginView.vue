<script setup lang="ts">
  import LoginForm from "@/components/LoginForm.vue";
  import LoginHeader from "@/components/LoginHeader.vue";
</script>

<template>
  <div class="container">
    <div class="d-flex flex-column gap-4">
      <LoginHeader />
      <LoginForm/>
    </div>
  </div>
</template>

<style scoped>

</style>
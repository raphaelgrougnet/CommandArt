<script setup lang="ts">
  import RegisterForm from "@/components/RegisterForm.vue";
  import RegisterHeader from "@/components/RegisterHeader.vue";
  import {type Ref, ref} from "vue";

  const emailExists = ref(null) as Ref<boolean | null>
  const changeEmailExists = (exists: boolean) => {
    emailExists.value = exists
  }
</script>

<template>
  <div class="container">
    <div class="d-flex flex-column gap-4">
      <RegisterHeader :emailExists="emailExists"/>
      <RegisterForm :emailExists="emailExists" @changeEmailExists="changeEmailExists"/>
    </div>
  </div>
</template>

<style scoped>

</style>
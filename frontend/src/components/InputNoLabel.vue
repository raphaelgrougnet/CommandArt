<script setup lang="ts">

const props = defineProps<{
  label: string,
  placeholder: string,
  name: string,
  type: string,
  disabled: boolean,
  errors: string,
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="containerInput">
    <label class="visually-hidden" :for="props.name">{{ label }}</label>
    <input class="form-control"
           :type="props.type"
           :id="props.name"
           :name="props.name"
           :placeholder="props.placeholder"
           :disabled="props.disabled"
           :value="props.modelValue"
           @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    <span v-if="errors.length > 0" class="text-danger text-left w-100 errors">{{ errors }}</span>

  </div>
</template>

<style scoped>
  .containerInput {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .form-control {
      font-size: .875rem;
      height: 2.5rem;
    }

    .errors {
      font-size: .75rem;
      margin-top: 3px;
    }
  }
</style>
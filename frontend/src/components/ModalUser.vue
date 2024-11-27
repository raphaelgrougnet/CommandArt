<script setup lang="ts">
  import type {User} from "@/types/User";
  import {CircleUserRound, LogOut} from "lucide-vue-next";
  import router from "@/router/router";
  import UpdateUserForm from "@/components/UpdateUserForm.vue";

  const props = defineProps<{
    user: User | null
  }>();

  const onDisconnect = () => {
    router.push({name : "logout"})
  }
</script>

<template>
  <button type="button" class="btn primaryBtn d-flex justify-content-center align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#userModal">
    <CircleUserRound />
    {{user!!.username}}
  </button>

  <div class="modal fade" id="userModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="userModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between align-items-center">
          <h1 class="modal-title fs-5 d-flex justify-content-start align-items-center gap-2" id="userModalLabel">
            <CircleUserRound /> Votre profil
          </h1>
          <button @click="onDisconnect" class="btn tertiaryBtn d-flex justify-content-center align-items-center gap-2" data-bs-dismiss="modal">
            <LogOut /> Se déconnecter
          </button>
        </div>
        <div class="modal-body">
          <UpdateUserForm :user="props.user" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
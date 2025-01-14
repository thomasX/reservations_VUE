<script setup>
import { onMounted,reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore()
const authStore = useAuthStore();

const formData = reactive({
  email: '',
  password: '',
})

onMounted(() => {errors.value={}});

</script>

<template>
  <main>
    <h1 class="title">Login to your account </h1>

    <form @submit.prevent="()=>{authStore.authenticate('login',formData)}" class="w-1/2 mx-auto space-y-6">
      <div>
        <input type="text" placeholder="Email"  v-model="formData.email"/>
        <p v-if="errors.email" class="error" > {{ authStore.errors.email[0] }} </p>
      </div>
      <div>
        <input type="password" placeholder="Password"  v-model="formData.password"/>
        <p v-if="authStore.errors.password" class="error" > {{ authStore.errors.password[0] }} </p>
      </div>
      <button class="primary-btn">Login</button>
    </form>
  </main>
</template>

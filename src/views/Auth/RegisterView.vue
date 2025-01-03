<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore()
const { errors } = storeToRefs(useAuthStore());


const formData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})
onMounted(() => {errors.value={}})
</script>

<template>
  <main>
    <h1 class="title">register a new account </h1>

    <form @submit.prevent="()=>{authStore.authenticate('register',formData)}" class="w-1/2 mx-auto space-y-6">
      <div>
        <input type="text" placeholder="Name" v-model="formData.name" />
          <p v-if="authStore.errors.name" class="error" > {{ authStore.errors.name[0] }} </p>
      </div>
      <div>
        <input type="text" placeholder="Email"  v-model="formData.email"/>
        <p v-if="authStore.errors.email" class="error" > {{ authStore.errors.email[0] }} </p>
      </div>
      <div>
        <input type="password" placeholder="Password"  v-model="formData.password"/>
        <p v-if="authStore.errors.password" class="error" > {{ authStore.errors.password[0] }} </p>
      </div>
      <div>
        <input type="password" placeholder="Password_Confirmation"  v-model="formData.password_confirmation"/>
      </div>
      <button class="primary-btn">Register</button>
    </form>
  </main>
</template>

<script setup>
import { usePostsStore } from "@/stores/posts";
import { reactive } from "vue";

const postsStore = usePostsStore();


const formData = reactive({
  title: '',
  body: '',
})
</script>
<template>
  <main>
    <h1 class="title">Create a new post</h1>                                                                                                         
    <form @submit.prevent="()=>{postsStore.createPost('posts',formData)}" class="w-1/2 mx-auto space-y-6">
      <div>
        <input type="text" placeholder="Post Title" v-model="formData.title">
        <p v-if="postsStore.errors.title" class="error">{{ errors.title[0] }}</p>
      </div>
       <div>
        <textarea rows="6" placeholder="Post content" v-model="formData.body"></textarea>
        <p v-if="postsStore.errors.body" class="error">{{ errors.body[0] }}</p>
       </div>
       <button class="primary-btn">Create</button>
    </form>
  </main>
</template>
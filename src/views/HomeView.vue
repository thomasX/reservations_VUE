<script setup>
import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
const postsStore = usePostsStore();
 const { deletePost } = usePostsStore();
const posts =ref([])
onMounted(async () => posts.value = await postsStore.getAllPosts('posts/'));
</script>
<template>
  <main>
    <h1 class="title">my latest posts </h1>
    <div v-if="posts.length > 0">
      <div v-for="post in posts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12">
        <h2 class="font-bold text-3xl text-slate-600 mb-4">{{ post.title }}</h2>
        <p class="text-xs text-slate-600 mb-4">
          posted by {{ post.user.name }}
        </p>
        <p>
          {{ post.body }} 
          <RouterLink  :to="{name:'show', params: {id: post.id}}"  class="text-blue-500 font-bold underline">Read more...</RouterLink>
        </p>
        <div>
          <form @submit.prevent="postsStore.deletePost('posts',post)">
            <button class="text-red-600 font-bold border border-red-600 p-1 ">delete</button>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="title">There are no posts</h2>
    </div>
  </main>
</template>

<script setup>
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const postsStore = usePostsStore();
const route = useRoute();

const formData = reactive({
  title: '',
  body: '',
})

onMounted(async () => {
  const post=await postsStore.getPost("posts",route.params.id)
  formData.title=post[0].title
  formData.body=post[0].body
  console.log('post.title: ' + post[0].title)
  errors.value={}
})
</script>
<template>
  <main>
    <h1 class="title">Create a new post</h1>                                                                                                         
    <form class="w-1/2 mx-auto space-y-6">
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
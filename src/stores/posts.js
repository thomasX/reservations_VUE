import { defineStore } from "pinia";
import  axios  from 'axios';
import { useAuthStore } from "./auth";
export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      errors: {},
      apiURL: import.meta.env.VITE_API_URL,
    };
  },
  getters: {},
  actions: {
 /************** delete a posts *****************+*/
async deletePost(apiRoute,post) {
  const authStore = useAuthStore();
  if (authStore.user.id === post.user_id){
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type' : 'application/json'
        }
      }
      const servicePath = this.apiURL + apiRoute +'/' + post.id;
      const jsonBody = "";
      console.log(servicePath)
      const response  = await axios.delete(servicePath, config)
      result = response
      data=result.data;
      this.post = data.user
      this.errors = {}
      this.router.push({ name: "home"});
    } catch (error) {
        const myrrors = error.response.data.errors; 
        this.errors= myrrors;
        // console.log(myrrors)
    }
  } 
},
  /************** get a posts *****************+*/
 async getPost (apiRoute, id) {
  let result
  let data
  let body = {}

  try {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type' : 'application/json'
      }
    }
    const servicePath = this.apiURL + apiRoute +'/'+ id;
    const response  = await axios.get(servicePath, config)
    result = response
    data=result.data;
    console.log(data)
    this.post = data.user
    this.errors = {}
    return data;
  } catch (error) {
    const myrrors = error.response.data.errors; 
    this.errors= myrrors;
  }
}
,
    /************** get all posts *****************+*/
    async getAllPosts (apiRoute) {
      let result
      let data
      let body = {}

      try {
        const config = {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'application/json'
          }
        }
        const servicePath = this.apiURL + apiRoute;
        const jsonBody = JSON.stringify(body);
        const response  = await axios.get(servicePath, config)
        result = response
        data=result.data;
        console.log(data)
        this.post = data.user
        this.errors = {}
        return data;
      } catch (error) {
        const myrrors = error.response.data.errors; 
        this.errors= myrrors;
      }
    }
    ,
    /************** create post *****************+*/
    async createPost (apiRoute, body) {
      let result
      let data

    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type' : 'application/json'
        }
      }
      const servicePath = this.apiURL + apiRoute;
      const jsonBody = JSON.stringify(body);
      const response  = await axios.post(servicePath, jsonBody, config)
      result = response
      data=result.data;
      this.post = data.user
      this.errors = {}
      this.router.push({ name: "home"});
    } catch (error) {
      const myrrors = error.response.data.errors; 
      this.errors= myrrors;
      // console.log(myrrors)
    }
    }
  },
});
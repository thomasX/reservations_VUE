import { defineStore } from "pinia";
import  axios  from 'axios';
export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      errors: {},
      apiURL: import.meta.env.VITE_API_URL,
    }
  },
  getters: {},
  actions: {
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
      // console.log(data)
      // localStorage.setItem('token', data.token)
      this.post = data.user
      this.errors = {}
    } catch (error) {
      const myrrors = error.response.data.errors; 
      this.errors= myrrors;
      // console.log(myrrors)
    }
    }
  },
});
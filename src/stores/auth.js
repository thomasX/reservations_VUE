import { defineStore } from "pinia";
import  axios  from 'axios';
export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: null,
      errors: {},
      apiURL: import.meta.env.VITE_API_URL,
    }
  },
  getters: {},
  actions: {
    /************** logout  user *****************+*/
    async logout() {
      let apiRoute = "logout"
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
        const response  = await axios.post(servicePath, '{}',config)
        this.user = null;
        this.errors ={};
        data=response.data;
        localStorage.removeItem('token');
        // console.log(data.message);
        this.router.push({ name: "home"});
      } catch (error) {
        // console.log(error)
        // const myrrors = error.response.data.errors; 
        // this.errors= myrrors;
        // console.log(myrrors)
      }
    },
    /************** get authenticated user *****************+*/
    async getUser() {
      if (localStorage.getItem('token')) {
        let apiRoute = "user"
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
          const response  = await axios.get(servicePath, config)
          data = response.data
          // console.log(data)
          this.user = data
        } catch (error) {
          // console.log(error)
          const myrrors = error.response.data.errors; 
          this.errors= myrrors;
          // console.log(myrrors)
        }
      }
    },
    /************** login or register user *****************+*/
    async authenticate(apiRoute, body, token ) {
      let result
      let data

    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type' : 'application/json'
        }
      }
      if (token !== undefined) config.headers.Authorization = 'Bearer ' + token;
      const servicePath = this.apiURL + apiRoute;
      const jsonBody = JSON.stringify(body);
      const response  = await axios.post(servicePath, jsonBody, config)
      result = response
      data=result.data;
      // console.log(data)
      localStorage.setItem('token', data.token)
      this.user = data.user
      this.errors = {}
      this.router.push({ name: "home"});
    } catch (error) {
      const myrrors = error.response.data.errors; 
      this.errors= myrrors;
      // console.log(myrrors)
    }
    },
  },
});
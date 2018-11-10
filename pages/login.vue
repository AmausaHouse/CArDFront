<template>
  <div>
    <p>{{ user }}</p>
    <input 
      v-model="username"
      placeholder="username">
    <input 
      v-model="password"
      placeholder="password">
    <button @click="login">login</button>
    <button @click="singup">signup</button>
    <button @click="logout">logout</button>
    <a href="/api/user/login/twitter/" >twitterでlogin</a>
    <a href="/api/user/login/github/" >githubでlogin</a>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  data: function() {
    return {
      user: '',
      username: '',
      password: ''
    }
  },
  mounted: function() {
    axios
      .get('http://localhost:8080/api/login')
      .then(response => (this.user = response.data))
  },
  methods: {
    login: function() {
      axios
        .post('http://localhost:8080/api/login', {
          username: this.username,
          password: this.password
        })
        .then(response => alert(response.data))
    },
    logout: function() {
      axios
        .delete('http://localhost:8080/api/login')
        .then(response => alert(response.data))
    },
    singup: function() {
      axios
        .post('http://localhost:8080/api/signup', {
          username: this.username,
          password: this.password
        })
        .then(response => alert(response.data))
    }
  }
}
</script>

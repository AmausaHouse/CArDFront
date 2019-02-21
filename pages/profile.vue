<template>
  <div>
    <p>{{ user }}</p>
    <p>表示名{{ display_name }}</p>
    <p>アイコン画像</p>
    <img :src="icon_url" />
    <button @click="logout">logout</button>
    <button @click="get_icon_from_social">iconを自動取得</button>
    <input v-model="display_name" />
    <button @click="update_display_name">表示名を再設定</button>
    <input v-model="user_dict" />
    <button @click="update_user_dict">user dictionalyを再設定</button>
    <a href="/api/user/login/twitter/">twitterでlogin</a>
    <a href="/api/user/login/github/">githubでlogin</a>
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
      icon_url: '',
      display_name: '',
      user_dict: ''
    }
  },
  mounted: function() {
    axios
      .get('http://localhost:8080/api/login')
      .then(response => (this.user = response.data))
    axios.get('http://localhost:8080/api/profile/').then(response => {
      this.icon_url = response.data.icon
      this.display_name = response.data.name
      this.user_dict = response.data.dict
    })
  },
  methods: {
    get_icon_from_social: function() {
      axios
        .post('http://localhost:8080/api/profile/?req_type=icon')
        .then(r => consolt.log(r))
      axios
        .get('http://localhost:8080/api/profile/')
        .then(response => (this.icon_url = response.data))
    },
    logout: function() {
      axios
        .delete('http://localhost:8080/api/login')
        .then(response => alert(response.data))
    },
    update_display_name: function() {
      axios
        .post('http://localhost:8080/api/profile/?req_type=name', {
          name: this.display_name
        })
        .then(r => consolt.log(r))
    },
    update_user_dict: function() {
      axios
        .post('http://localhost:8080/api/profile/?req_type=dict', {
          dict: this.user_dict
        })
        .then(r => consolt.log(r))
    }
  }
}
</script>

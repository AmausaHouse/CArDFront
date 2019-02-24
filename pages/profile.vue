<template>
  <div>
    <b-card class="m-5">
      <div v-if="show">
        <p>ユーザー名 {{ user }}</p>
        <p>表示名 {{ display_name }}</p>
        <p>アイコン画像</p>
        <b-img :src="icon_url" width="100%" height="100%" />
        <b-button class="d-block mt-2 mb-2" @click="get_icon_from_social">
          iconを自動取得
        </b-button>
        <b-form-input v-model="display_name" />
        <b-button class="d-block mt-2 mb-2" @click="update_display_name">
          表示名を再設定
        </b-button>
        <b-form-input v-model="user_dict" />
        <b-button class="mt-2 mb-2" @click="update_user_dict">
          user dictionalyを再設定
        </b-button>
        <b-button
          variant="danger"
          class="mt-2 mb-2 float-right"
          @click="logout"
        >
          logout
        </b-button>
      </div>
      <div v-show="!show">
        <p>ログインしてください</p>
        <a href="/api/user/login/twitter/">twitterでlogin</a>
        <a href="/api/user/login/github/">githubでlogin</a>
      </div>
      <b-button class="mt-2 mb-2" variant="success" href="/">
        戻る
      </b-button>
    </b-card>
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
      user_dict: '',
      show: false
    }
  },
  mounted: function() {
    axios.get('https://c-ar-d.app/api/login').then(response => {
      this.user = response.data
      this.show = true
    })
    axios.get('https://c-ar-d.app/api/profile/').then(response => {
      this.icon_url = response.data.icon
      this.display_name = response.data.name
      this.user_dict = response.data.dict
    })
  },
  methods: {
    get_icon_from_social: function() {
      axios
        .post('https://c-ar-d.app/api/profile/?req_type=icon')
        .then(r => consolt.log(r))
      axios
        .get('https://c-ar-d.app/api/profile/')
        .then(response => (this.icon_url = response.data))
    },
    logout: function() {
      axios
        .delete('https://c-ar-d.app/api/login')
        .then(response => location.reload())
    },
    update_display_name: function() {
      axios
        .post('https://c-ar-d.app/api/profile/?req_type=name', {
          name: this.display_name
        })
        .then(r => consolt.log(r))
    },
    update_user_dict: function() {
      axios
        .post('https://c-ar-d.app/api/profile/?req_type=dict', {
          dict: this.user_dict
        })
        .then(r => consolt.log(r))
    }
  }
}
</script>

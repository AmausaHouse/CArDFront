<template>
  <section>
    <input
      ref="file"
      type="file">

    <button @click="submitImage">
      Submit image
    </button>
    <p>{{ message }}</p>
  </section>
</template>

<script>
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  data: function() {
    return {
      file: null,
      message: ''
    }
  },
  methods: {
    submitImage: function() {
      this.file = this.$refs.file.files[0]
      let fromData = new FormData()
      fromData.append('file', this.file)
      axios
        .post('http://localhost:8080/api/face/', fromData)
        .then(response => {
          this.message = response.data
        })
        .catch(e => {
          this.message = 'failed'
        })
    }
  }
}
</script>

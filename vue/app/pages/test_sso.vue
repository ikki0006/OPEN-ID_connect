<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        rotten_tarte
      </h1>
      <h2 class="subtitle">
        SSO test project
      </h2>
        <form v-if="!this.$store.state.authUser">
        <p v-if="formError" class="error">
          {{ formError }}
        </p>
        <p><i><b>未ログイン</b>: 下記リンクよりSSOログインを実施してください</i></p>
        <router-link :to="link_para">SSO用ページ</router-link>
      </form>
      <router-link to="/test_sso">自ページ遷移用</router-link>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
const querystring = require('querystring')
var response_type = "code"
var client_id = "phDD5fJeWL0ffLdbkNSH4"
var redirect_uri = "http%3a%2f%2flocalhost%3a8080%2ftest_sso"
var redirect_url = "http://localhost:8080/test_sso"
var scope = "xxxx"
var state = "abcdef"
var client_secret = "Wi9I9U-DU0yIo1i8HQ4mi"
var uel_query = `/?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`

export default {
  async created(){
    console.log(this)
    if(this.$route.fullPath == "/test_sso")
      return 0
    var data = await this.$axios.post(
      'http://localhost:8080/api/oauth2/token',
      querystring.stringify({
        grant_type: "authorization_code",
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_url,
        code: this.$route.query["code"]
      }))
    console.log(data.data)
    var result = await this.$axios.get(
      'http://localhost:8080/api/oauth2/secret',{
          headers: { "Authorization": "Bearer " + data.data.access_token },
          data: {}
    })
  },
  async asyncData({route, app, query, redirect}){
    console.log("test")
    if(route.fullPath == "/test_sso")
      return 0
    console.log(query)
    // var data = await app.$axios.post('http://localhost:8080/api/oauth2/token', {
    //   grant_type: "authorization_code",
    //   // client_id: client_id,
    //   // client_secret: client_secret,
    //   // redirect_uri: redirect_uri,
    //   // code: query["code"]
    // }
    // )
  },
  data() {
    return {
      formError: null,
      link_para: uel_query
    }
  },
  components: {
    Logo
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

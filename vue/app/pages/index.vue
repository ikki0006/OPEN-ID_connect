<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">
        rotten_tarte
      </h1>
      <h2 class="subtitle">
        My geometric Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  middleware: 'authenticated',
  async asyncData({route, app, query}){
    if(route.fullPath == "/")
      return 0
    let state = await app.$axios.$get(
      'http://localhost:8080/api/login/oauth_check')
    console.log(state)
    if(!state)
      return 0
    let data= await app.$axios.post('http://localhost:8080/api/oauth2/authorize', {
      response_type: query["response_type"],
      client_id: query["client_id"],
      redirect_uri: query["redirect_uri"],
      scope: query["scope"],
      state: query["state"]
    })
    console.log(data)

  },
  components: {
    Logo
  }
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

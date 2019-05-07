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

export default {
  async fetch ({ store }) {
    console.log(store.getters['authUser'])
  },
  data() {
    return {
      formError: null,
      //リダイレクトURLはエンコードしてるので注意。直す必要あり。
      link_para: '/?response_type=code&client_id=phDD5fJeWL0ffLdbkNSH4&redirect_uri=http%3a%2f%2flocalhost%3a8080%2ftest_sso&scope=xxxx&state=abcdef'
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

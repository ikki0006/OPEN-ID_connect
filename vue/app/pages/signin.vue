<template>
  <div class="login-form">
    <form @submit.prevent="login">
      <p class="error" v-if="error">{{ error }}</p>
      <p><input type="text" v-model="name" placeholder="name" name="name"/></p>
      <p><input type="password" v-model="password" placeholder="password" name="password"/></p>
      <div class="login-btn">
        <button type="submit">ログイン</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    middleware: 'noAuthenticated',
    data() {
      return {
        error: null,
        name: "",
        password: "",
      }
    },
    methods: {
      async login() {
        console.log(this.$route.fullPath)
        try {
          await this.$store.dispatch("login", {
            name: this.name,
            password: this.password
          })
          //パラメータを引き継ぐ。
          var path = this.$route.fullPath.replace('signin', '')
          this.$router.push(path)
        } catch(e) {
          this.error = e.message
        }
      }
    }
  }
</script>

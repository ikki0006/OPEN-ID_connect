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
        try {
          await this.$store.dispatch("login", {
            name: this.name,
            password: this.password
          })
          this.$router.push("/")
        } catch(e) {
          this.error = e.message
        }
      }
    }
  }
</script>

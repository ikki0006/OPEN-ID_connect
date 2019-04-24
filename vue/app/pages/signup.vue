<template>
  <div class="login-form">
    <form @submit.prevent="signup">
      <p class="error" v-if="error">{{ error }}</p>
      <p><input type="text" v-model="name" placeholder="name" name="name"/></p>
      <p><input type="text" v-model="email" placeholder="email" name="email"/></p>
      <p><input type="password" v-model="password" placeholder="password" name="password"/></p>
      <p><input type="password" v-model="repassword" placeholder="passwordの再入力" name="repassword"/></p>
      <div class="login-btn">
        <button type="submit">登録</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: null,
        name: "",
        email: "",
        password: "",
        repassword: ""
      }
    },
    methods: {
      async signup() {
        try {
          await this.$store.dispatch("login", {
            email: this.email,
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

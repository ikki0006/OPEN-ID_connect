<template>
  <div class="login-form">
    <form @submit.prevent="signup">
      <p class="error" v-if="error">{{ error }}</p>
      <p><input type="text" v-model="name" placeholder="name" name="name"/></p>
      <p><input type="text" v-model="email" placeholder="email" name="email"/></p>
      <p><input type="text" v-model="code" placeholder="tarte code" name="code"/></p>
      <p><input type="password" v-model="password" placeholder="password" name="password"/></p>
      <p><input type="password" v-model="repassword" placeholder="passwordの再入力" name="repassword"/></p>
      <div class="login-btn">
        <button type="submit">登録</button>
      </div>
      <p class="message" v-if="message">{{ message }}</p>
      <p>アカウントをお持ちの方は
      <router-link to="/signin?response_type=code">こちら</router-link>
    </p>
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
        code: "",
        password: "",
        repassword: "",
        message: ""
      }
    },
    methods: {
      async signup() {
        try {
          const res = await this.$store.dispatch("signup", {
            name: this.name,
            email: this.email,
            password: this.password,
            repassword: this.repassword,
            code: this.code
          })
          if(res.message == "登録完了しました"){
            this.name = ""
            this.email = ""
            this.code = ""
          }
          this.password = ""
          this.repassword = ""
          this.message = res.message
          this.error = null
        } catch(e) {
          this.error = e.message
        }
      }
    }
  }
</script>

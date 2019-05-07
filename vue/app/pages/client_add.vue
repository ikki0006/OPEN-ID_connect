<template>
  <div class="login-form">
    <form @submit.prevent="cliend_add">
      <p class="error" v-if="error">{{ error }}</p>
      <p><input type="text" v-model="client_name" placeholder="client_name" name="client_name"/></p>
      <p><input type="text" v-model="redirect_uri" placeholder="redirect_uri" name="redirect_uri"/></p>
      <p><input type="text" v-model="user_id" placeholder="user_id" name="user_id"/></p>
      <div class="login-btn">
        <button type="submit">登録</button>
      </div>
      <p class="message" v-if="message">{{ message }}</p>
    </p>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: null,
        client_name: "",
        redirect_uri: "",
        user_id: "",
        message: ""
      }
    },
    methods: {
      async cliend_add() {
        try {
          const res = await this.$store.dispatch("cliend_add", {
            client_name: this.client_name,
            redirect_uri: this.redirect_uri,
            user_id: this.user_id,
          })
          if(res.message == "登録完了しました"){
            this.client_name = ""
            this.redirect_uri = ""
            this.user_id = ""
          }
          this.message = res.message
          this.error = null
        } catch(e) {
          this.error = e.message
        }
      }
    }
  }
</script>

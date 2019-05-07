export default {
  // login実行用
  async login({ commit }, { name, password}) {
    try {
      // APIの通信。nustでリバプロしているので対象はnust自身
      // nust.config.jsで/apiをexpreeにルーティングしている
      // リバプロしないとクロスドメイン制約に引っかかる。。。
      const response = await this.$axios.$post(
        'http://localhost:8080/api/login/user_oauth', {
          name: name,
          password: password
        });
      let data = response;
    } catch (e) {
      throw e
    }
  },
  // 初回登録の実行用
  async signup({ commit }, { name, email, password, repassword, code}) {
    try {
      if(name == "" || email == "" || password == "" || code == "")
        throw new Error("全ての項目を埋めてください")
      if(password != repassword)
        throw new Error("passwordが一致しません")
      const response = await this.$axios.$post(
        'http://localhost:8080/api/login/user_add', {
            name: name,
            email: email,
            password: password,
            code: code
      });
      let data = response;
      return response
    } catch (e) { throw e }
  },
  // ログイン確認用
  async login_chk({ commit }) {
    try{
      const response = await this.$axios.$get(
        'http://localhost:8080/api/login/oauth_check')
        console.log(response)
    } catch(e) { throw e }
  },
  // クライアント登録用
  async cliend_add({ commit }, {client_name, redirect_uri, user_id}) {
    try{
      this.$axios.$post(
        'http://localhost:8080/api/client/', {
            client_name: client_name,
            redirect_uri: redirect_uri,
            user_id: user_id
      });
      let data = response;
      return response
    } catch (e) { throw e }
  },
  //認可コード取得用
  async get_code({ commit }, { client_id, redirect_uri, scope}) {
    try{
      const response = await this.$axios.$get(
        'http://localhost:8080/api/login/oauth_check')
        console.log(response)
    } catch(e) { throw e }
  },
}

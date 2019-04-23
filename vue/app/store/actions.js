export default {
  async login({ commit }, { email, password }) {
    console.log(commit)
    try {
      // APIの通信。nustでリバプロしているので対象はnust自身
      // nust.config.jsで/apiをexpreeにルーティングしている
      const response = await this.$axios.$get('http://localhost:8080/api/v1');
      let data = response;

      // 入力したメールアドレスとパスワードが
      // すでに登録されているメールアドレスとパスワードと一致した場合、変数dataに入力値が渡されます。
      //let data = { email: email, password: password }
      // 変数dataのを次のmutations.jsにあるAUTHED_USERメソッドに渡します。
      commit("AUTHED_USER", data)
    } catch (e) {
      throw e
    }
  }
}

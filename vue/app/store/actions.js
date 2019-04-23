var bcrypt = require('bcryptjs');
const saltRounds = 10; //ストレッチング回数

export default {
  async login({ commit }, { email, password }) {
    console.log(commit)
    try {
      //hashを生成して保存
      var hashpass = bcrypt.hashSync(password, saltRounds); //saltとパスワードを設定してhashを生成
      console.log(hashpass)

      // APIの通信。nustでリバプロしているので対象はnust自身
      // nust.config.jsで/apiをexpreeにルーティングしている
      // リバプロしないとクロスドメイン制約に引っかかる。。。
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

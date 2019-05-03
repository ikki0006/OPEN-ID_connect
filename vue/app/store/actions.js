var bcrypt = require('bcryptjs');
const saltRounds = 10; //ストレッチング回数。passのhash化に必要

export default {
  // login実行用
  async login({ commit }, { name, password }) {
    console.log(commit)
    try {
      //hashを生成して保存
      var hashpass = bcrypt.hashSync(password, saltRounds);
      console.log(hashpass)

      // APIの通信。nustでリバプロしているので対象はnust自身
      // nust.config.jsで/apiをexpreeにルーティングしている
      // リバプロしないとクロスドメイン制約に引っかかる。。。
      const response = await this.$axios.$get('http://localhost:8080/api/oauth/');
      let data = response;

      // 入力したメールアドレスとパスワードが
      // すでに登録されているメールアドレスとパスワードと一致した場合、変数dataに入力値が渡されます。
      //let data = { email: email, password: password }
      // 変数dataのを次のmutations.jsにあるAUTHED_USERメソッドに渡します。
      commit("AUTHED_USER", data)
    } catch (e) {
      throw e
    }
  },
  // 初回登録の実行用
  async signup({ commit }, { name, email, password, repassword, code}) {
    console.log(commit)
    try {

      if(password != repassword){
        return { sate: false, message:"passwordが一致しません"}
      }
      //hashを生成して保存
      var hashpass = bcrypt.hashSync(password, saltRounds);
      console.log(hashpass)

      // APIの通信。nustでリバプロしているので対象はnust自身
      // nust.config.jsで/apiをexpreeにルーティングしている
      // リバプロしないとクロスドメイン制約に引っかかる。。。
      const response = await this.$axios.$post(
        'http://localhost:8080/api/login/user_add', {
            name: name,
            enail: email,
            password: hashpass,
            code: code
      });
      let data = response;

      // 入力したメールアドレスとパスワードが
      // すでに登録されているメールアドレスとパスワードと一致した場合、変数dataに入力値が渡されます。
      //let data = { email: email, password: password }
      // 変数dataのを次のmutations.jsにあるAUTHED_USERメソッドに渡します。
      commit("SIGNUP_USER", data)
      return response
    } catch (e) {
      throw e
    }
  }
}

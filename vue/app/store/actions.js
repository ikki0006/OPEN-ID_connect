export default {
  async login({ commit }, { email, password }) {
    console.log(commit)
    try {
      // ここでは仮に
      // メールアドレス： test@email
      // パスワード： 123456789
      // 本ちゃんはAPIで問い合わせをかけてcookieの払い出しとトークンIDの発行、リダイレクトを行う。
      if (email != "test@email" || password != 123456789) {
        throw new Error("idかpass間違ってるよ!!!")
      }
      // 入力したメールアドレスとパスワードが
      // すでに登録されているメールアドレスとパスワードと一致した場合、変数dataに入力値が渡されます。
      let data = { email: email, password: password }
      // 変数dataのを次のmutations.jsにあるAUTHED_USERメソッドに渡します。
      commit("AUTHED_USER", data)
    } catch (e) {
      throw e
    }
  }
}

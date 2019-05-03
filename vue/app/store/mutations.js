export default {
  AUTHED_USER: function (state, data) {
    console.log(data);
    state.authUser = data // expreeより戻ってきたcookieを入れる?
  },
  SIGNUP_USER: function (state, data) {
    console.log(data);
  }
}

export default {
  AUTHED_USER: function (state, data) {
    console.log(data);
    state.authUser = data // 入力したemailとpasswordがここに入るs
  }
}

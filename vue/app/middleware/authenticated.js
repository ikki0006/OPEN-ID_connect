export default function ({ app, redirect }) {
  // ユーザが認証されていない場合
  app.$axios.get('http://localhost:8080/api/login/oauth_check').then(
    function(data){
      if(!data.data)
        return redirect('/signin')
    }
  )
}

// export default {
//   async login_chk ({req, res}) {
//     console.log(login_state)
//   }
// }

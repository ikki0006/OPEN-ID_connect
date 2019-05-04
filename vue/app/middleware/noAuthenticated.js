export default function ({ app, redirect }) {
  // ユーザが認証されていない場合
  app.$axios.get('http://localhost:8080/api/login/oauth_check').then(
    function(data){
      console.log("test")
      if(data.data)
        return redirect('/')
    }
  )
}

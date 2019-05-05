export default function ({ app, redirect, route }) {
  // ユーザが認証されていない場合
  app.$axios.get('http://localhost:8080/api/login/oauth_check').then(
    function(data){
      console.log(data)
      if(!data.data)
        //パラメータを引き継ぐ。
        var path = route.fullPath.replace('/', '/signin')
        return redirect(path)
    }
  )
}

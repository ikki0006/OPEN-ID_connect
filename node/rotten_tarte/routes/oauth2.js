const express = require('express');
const router = express.Router();
const nanoid =  require('nanoid');
const db = require('../models');
const OAuthServer = require('express-oauth-server');
// import OAuthServer from 'express-oauth-server'
//
express.oauth = new OAuthServer({
  model: require('../services/oauth'),
})

// 現在ログイン中のユーザー情報をハンドリングする
async function loadCurrentUser(req) {
    const User = {id: 1}
    return User
    const user = req.session.user
    if(user == undefined)
      throw new Error("未ログイン");
    const id = await db.user.findAll({
        where: {name: user}
    })
    return {id: id[0].id}
    // db.user.findAll({
    //     where: {name: user}
    // }).then(result => {
    //   User = { id: results[0].id }
    //   console.log(User)
    //   return User
    // }).catch(err => {
    //     console.log(err)
    //     return err
    // })
    // const User = async () => {
    //   const user = req.session.user
    //   const id = await b.user.findAll({
    //       where: {name: user}
    //   })
    //   console.log(id)
    //   return {id: 1}
    // }

}

router.get('/test', function(req, res, next){
    res.json("test")
})

// 認可エンドポイント POST
// 上記で許可されたクエリがPOST送信され、自動で認可コードが発行される
// 認可コードはredirect_uriで指定されたURLにクエリ付きで通知
router.post('/authorize', express.oauth.authorize({
    authenticateHandler: {
        handle: loadCurrentUser
    }
}), function (req, res, next) {

        // new OAuthServer時にoptions: {continueMiddleware: true}が呼ばれていなければ読み込まれません
})

module.exports = router;

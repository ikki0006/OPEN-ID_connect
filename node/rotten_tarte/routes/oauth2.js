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
    const user = req.session.user
    if(user == undefined)
      throw new Error("未ログイン");
    const id = await db.user.findAll({
        where: {name: user}
    })
    return {id: id[0].id}
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

// トークンエンドポイント POST
// grant_typeがauthorization_codeの場合、
// client_id, client_secret, redirect_uri, 上記で通知された認可コードを送信する
// アクセストークンとリフレッシュトークンが返却される
// grant_typeがrefresh_tokenの場合、
// client_id, client_secret, refresh_tokenを送信する
// 新たなアクセストークンとリフレッシュトークンが返却される
router.post('/token', express.oauth.token(), function (req, res, next) {
    /***********************************
    トークンエンドポイント パラメータ一覧
    ?grant_type=authorization_code or refresh_token 必須 clientテーブルにgrantカラムとして登録しておくっぽい
    &client_id={クライアントID} 必須
    &client_secret={クライアントシークレット} 必須
    &redirect_uri={リダイレクトURI} authorization_codeの場合必須
    &code={認可コード} 必須 authorization_codeの場合必須
    &refresh_token={リフレッシュトークン} refresh_tokenの場合必須
    ************************************/
    res.json('token') // <--- new OAuthServer時にoptions: {continueMiddleware: true}が呼ばれていなければ読み込まれません
})

// セキュリティで保護されたルート
// headerにAuthorization: Bearer {アクセストークン}を設定することでアクセスできる
router.get('/secret', express.oauth.authenticate(), function (req, res, next) {
    res.json('secret')
})

module.exports = router;

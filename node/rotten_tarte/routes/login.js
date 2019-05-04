const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models');
const nanoid =  require('nanoid');
const router = express.Router()
const saltRounds = 10; //ストレッチング回数。passのhash化に必要
const redirect_uri = 'http://localhost:8080/'

// ログイン認証
router.post('/user_oauth/', function (req, res, next) {
    db.user.findAll({
        where: {name: req.body.name}
    }).then(result => {
        results = JSON.parse(JSON.stringify(result));
        if(results.length == 0)
          res.status(401).json("Unauthorized");
        console.log(results[0].password);
        pass = bcrypt.compareSync(req.body.password, results[0].password);
        console.log(pass);
        if(!pass)
          res.status(401).json("Unauthorized");

        //セッションの作成
        req.session.user = req.body.name;
        res.json("ログイン成功");
    }).catch(err => {
        console.log(err)
        res.json(err.errors[0])
    })
})

// ログイン状態チェック
router.get('/oauth_check', function(req, res, next){
  if (!req.session.user)
    res.json(false);
  res.json(true);
})

// ユーザ登録
router.post('/user_add', function (req, res, next) {
  console.log(req.body.email)
  var hashpass = bcrypt.hashSync(req.body.password, saltRounds);
  db.user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashpass,
      code: req.body.code
  }).then(result => {
      console.log(result.get({plain: true}))
      res.json({message: '登録完了しました'})
  }).catch(err => {
      console.log(err)
      res.json(err.errors[0])
  })
})

// ユーザ情報変更
router.post('/user_mod', function (req, res, next) {
    db.oauth_clients.destroy({
        where: {id: req.params.id}
    }).then(result => {
        res.json('Delete Success')
    })
})

module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models');
const nanoid =  require('nanoid');
const router = express.Router()
const saltRounds = 10; //ストレッチング回数。passのhash化に必要

// ログイン認証
router.post('/user_oauth/', function (req, res, next) {
    db.users.findAll({
        where: {name: req.body.name}
    }).then(result => {
        results = JSON.parse(JSON.stringify(result));
        console.log(results[0].password);
        pass = bcrypt.compareSync(req.body.password, results[0].password);
        console.log(pass);
        res.json(pass);
    })
})

// ユーザ登録
router.post('/user_add', function (req, res, next) {
  //console.log(db.users)
  var hashpass = bcrypt.hashSync(req.body.password, saltRounds);
  db.users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashpass,
      code: req.body.code
  }).then(result => {
      console.log(result.get({plain: true}))
      res.json({message: '登録完了しました'})
  }).catch(err => {
      console.log(err)
      res.status(400).json('DataBase Error')
  })
})

// ユーザ情報変更
router.delete('/client/:id', function (req, res, next) {
    db.oauth_clients.destroy({
        where: {id: req.params.id}
    }).then(result => {
        res.json('Delete Success')
    })
})

module.exports = router;

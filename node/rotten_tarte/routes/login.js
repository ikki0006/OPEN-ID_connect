const express = require('express');
const db = require('../models');
const nanoid =  require('nanoid');
const router = express.Router()

// ログイン認証
router.get('/user_oauth/:id', function (req, res, next) {
    db.user.findAll({
        where: {id: req.params.id}
    }).then(result => {
        res.json(JSON.stringify(result))
    })
})

// ユーザ登録
router.post('/user_add', function (req, res, next) {
  //console.log(db.users)
  db.users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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

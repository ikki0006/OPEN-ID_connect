const express = require('express');
const db = require(__dirname + '/../models');
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
    db.user.create({
        client_name: req.body.client_name,
        client_id: nanoid(),
        client_secret: nanoid(),
        redirect_uri: req.body.redirect_uri,
        user_id: req.body.user_id
    }).then(result => {
        console.log(result.get({plain: true}))
        res.json('ok')
    }).catch(err => {
        console.log(err)
        res.status(400).json('DataBase Error')
    })
})

// ユーザ削除
router.delete('/client/:id', function (req, res, next) {
    db.oauth_clients.destroy({
        where: {id: req.params.id}
    }).then(result => {
        res.json('Delete Success')
    })
})

module.exports = router;

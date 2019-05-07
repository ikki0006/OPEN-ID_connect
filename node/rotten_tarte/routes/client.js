const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../models');
const nanoid =  require('nanoid');

// クライアント登録
router.post('/', function (req, res, next) {
    db.oauth_client.create({
        client_name: req.body.client_name,
        client_id: nanoid(),
        client_secret: nanoid(),
        redirect_uri: req.body.redirect_uri,
        user_id: req.body.user_id
    }).then(result => {
        console.log(result.get({plain: true}))
        res.json({message: '登録完了しました'})
    }).catch(err => {
        console.log(err)
        res.status(400).json('DataBase Error')
    })
})

// クライアント取得
router.get('/add/:id', function (req, res, next) {
    db.oauth_clients.findAll({
        where: {user_id: req.params.id}
    }).then(result => {
        res.json(JSON.stringify(result))
    })
})

// クライアント削除
router.get('/delete', function (req, res, next) {
    db.oauth_clients.destroy({
        where: {id: req.params.id}
    }).then(result => {
        res.json('Delete Success')
    })
})

module.exports = router;

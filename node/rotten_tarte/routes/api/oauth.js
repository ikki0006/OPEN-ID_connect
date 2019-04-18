import app from 'express'

const db = require(__dirname + '/../models')
import nanoid from 'nanoid'

const router = app.Router()

// クライアント取得
router.get('/oauth/client/:id', function (req, res, next) {
    db.oauth_clients.findAll({
        where: {user_id: req.params.id}
    }).then(result => {
        res.json(JSON.stringify(result))
    })
})

// クライアント登録
router.post('/oauth/client', function (req, res, next) {
    db.oauth_clients.create({
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

// クライアント削除
router.delete('/oauth/client/:id', function (req, res, next) {
    db.oauth_clients.destroy({
        where: {id: req.params.id}
    }).then(result => {
        res.json('Delete Success')
    })
})

export default router

const db = require('../models')

// アクセストークンの取得
module.exports.getAccessToken = function(accessToken) {
    return db.oauth_token.findOne({
        where: {access_token: accessToken}
    }).then(result => {
        const token = function (input) {
            return new Promise(resolve => {
                resolve(input)
            })
        }
        const client = function (input) {
            return new Promise(resolve => {
                db.oauth_client.findOne({
                    where: {client_id: result.client_id}
                }).then(result => {
                    resolve(result)
                })
            })
        }

        const user = function (input) {
            return new Promise(resolve => {
                db.user.findOne({
                    where: {id: result.user_id}
                }).then(result => {
                    resolve(result)
                })
            })
        }

        return Promise.all([
            token(result),
            client(result),
            user(result)
        ])
    }).spread((token, client, user) => {
        return {
            accessToken: token.access_token,
            accessTokenExpiresAt: token.expires_at,
            scope: token.scope,
            client: {id: client.client_id},
            user: {id: user.id}
        }
    })
}

// 認可コードの取得
module.exports.getAuthorizationCode = function(authorizationCode) {
    return db.oauth_authorization_code.findOne({
        where: {code: authorizationCode}
    }).then(result => {
        const authorization_code = function (input) {
            return new Promise(resolve => {
                resolve(input)
            })
        }
        const client = function (input) {
            return new Promise(resolve => {
                db.oauth_client.findOne({
                    where: {client_id: result.client_id}
                }).then(result => {
                    resolve(result)
                })
            })
        }

        const user = function (input) {
            return new Promise(resolve => {
                db.user.findOne({
                    where: {id: result.user_id}
                }).then(result => {
                    resolve(result)
                })
            })
        }

        return Promise.all([
            authorization_code(result),
            client(result),
            user(result)
        ])
    }).spread((authorization_code, client, user) => {
        return {
            code: authorization_code.code,
            expiresAt: authorization_code.expires_at,
            redirectUri: authorization_code.redirect_uri,
            scope: authorization_code.scope,
            client: {id: client.client_id},
            user: {id: user.id}
        }
    })
}

// クライアントの取得
module.exports.getClient = function(clientId, clientSecret) {
    let params = {client_id: clientId};
    if (clientSecret) {
        params.client_secret = clientSecret;
    }
    console.log(params)
    return db.oauth_client.findOne({
        where: params
    }).then(result => {
        if(!result) {
            return null
        }
        const client = {
            id: result.client_id,
            redirectUris: [result.redirect_uri],
            grants: ['authorization_code', 'refresh_token'] // <--- データベースにgrantsとして登録しておくと吉？
        }
        return client
    })
}

// リフレッシュトークンの取得
module.exports.getRefreshToken = function(refreshToken) {
    return db.oauth_refresh_token.findOne({
        where: {refresh_token: refreshToken}
    }).then(result => {
        const token = function (input) {
            return new Promise(resolve => {
                resolve(input)
            })
        }
        const client = function (input) {
            return new Promise(resolve => {
                db.oauth_client.findOne({
                    where: {client_id: result.client_id}
                }).then(result => {
                    resolve(result)
                })
            })
        }

        const user = function (input) {
            return new Promise(resolve => {
                db.user.findOne({
                    where: {id: result.user_id}
                }).then(result => {
                    resolve(result)
                })
            })
        }

        return Promise.all([
            token(result),
            client(result),
            user(result)
        ])
    }).spread((token, client, user) => {
        return {
            refreshToken: token.refresh_token,
            refreshTokenExpiresAt: token.expires_at,
            client: {id: client.client_id},
            user: {id: user.id}
        }
    })
}

// 認可コードの取り消し
module.exports.revokeAuthorizationCode = function(authorizationCode) {
    return db.oauth_authorization_code.destroy({
        where: {code: authorizationCode.code}
    }).then(result => {
        return !!result
    })
}

// トークンの取り消し
module.exports.revokeToken = function(token) {
    return db.oauth_refresh_token.destroy({
        where: {refresh_token: token.refreshToken}
    }).then(result => {
        return !!result
    })
}

// 認可コードの生成
module.exports.saveAuthorizationCode = function(code, client, user) {
    let authCode = {
        code: code.authorizationCode,
        expires_at: code.expiresAt,
        redirect_uri: code.redirectUri,
        scope: code.scope,
        client_id: client.id,
        user_id: user.id
    }
    return db.oauth_authorization_code.create(authCode)
        .then(authorizationCode => {
            return {
                authorizationCode: authorizationCode.code,
                expiresAt: authorizationCode.expires_at,
                redirectUri: authorizationCode.redirect_uri,
                scope: authorizationCode.scope,
                client: {id: authorizationCode.client_id},
                user: {id: authorizationCode.user_id}
            }
        })
}

// アクセストークンの生成 こっちのPromise.all()の書き方のほうがすっきりしてるのかな
module.exports.saveToken = function(token, client, user) {
    let fns = [
        new Promise(resolve => {
            db.oauth_token.create({
                access_token: token.accessToken,
                expires_at: token.accessTokenExpiresAt,
                scope: token.scope,
                client_id: client.id,
                user_id: user.id,
            }).then(result => {
                resolve(result)
            })
        }),
        new Promise(resolve => {
            db.oauth_refresh_token.create({
                refresh_token: token.refreshToken,
                expires_at: token.refreshTokenExpiresAt,
                scope: token.scope,
                client_id: client.id,
                user_id: user.id,
            }).then(result => {
                resolve(result)
            })
        })
    ]

    return Promise.all(fns)
        .then(([accessToken, refreshToken]) => {
            return {
                accessToken: accessToken.access_token,
                accessTokenExpiresAt: accessToken.expires_at,
                refreshToken: refreshToken.refresh_token,
                refreshTokenExpiresAt: refreshToken.expires_at,
                scope: accessToken.scope,
                client: {id: accessToken.client_id},
                user: {id: accessToken.user_id}
            }
    })
}

// scopeのベリファイ
module.exports.verifyScope = function(token, scope) {
    if(!token.scope) {
        return false
    }
    let requestedScopes = scope.split(' ')
    let authorizedScopes = token.split(' ')
    return requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0)
}

FROM node:10.15.3-jessie


# node.js の環境変数を定義する
# 本番環境では production
ENV NODE_ENV=development

# 雛形を生成するのに必要なパッケージのインストール
# RUNが実行されるとイメージを作ってしまうので複数行を書くのは難しい。
# --squashオプションでいけるらしいが。。。。
RUN npm install -g vue-cli && \
  npm install -g nuxt && \
  npm install -g create-nuxt-app

# ディレクトリを移動する
WORKDIR /app

# ポート8080番を開放する
EXPOSE 8080

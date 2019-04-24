FROM node:10.15.3-jessie


# node.js の環境変数を定義する
# 本番環境では production
ENV NODE_ENV=development

# 雛形を生成するのに必要なパッケージのインストール
# RUNが実行されるとイメージを作ってしまうので複数行を書くのは難しい。
# --squashオプションでいけるらしいが。。。。
RUN npm install -g express-generator && \
  npm install -g sequelize@5.7.4 && \
  npm install -g mysql2@1.6.5 && \
  npm install -g sequelize-cli && \
  npm install -g pm2

# ディレクトリを移動する
WORKDIR /rotten_tarte

# ポート3000番を開放する
EXPOSE 3000

# cmdでnpm起動
CMD ["pm2", "--no-daemon", "start", "app.js", "--watch"]

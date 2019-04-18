# OPEN-ID_connect
docker(expressとnust.js)で作るopen-id connect

cd <cloneしたディレクトリ>

docker-compose build

docker-compose up -d

### web(nust.js)に入る場合
docker exec -it rotten_tarte_web /bin/bash

### app(node.js)に入る場合
docker exec -it rotten_tarte /bin/bash

### db(mysql)に入る場合
docker exec -it rotten_tarte_db /bin/bash

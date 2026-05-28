# todo-management

This is going to be a interview tech task

1. npx tsc --init -,,, init the tsconfig file
2. module && moduleResolution : they must be the same

# 1. 後台啟動服務（自動讀取 .env 與 docker-compose.yml）

docker compose up -d

# 2. 檢查容器狀態與健康檢查結果 (顯示為 healthy 即可)

docker compose ps

# 3. 連線進入 psql 終端機進行操作

docker compose exec -it db psql -U admin -d app_development

# 4. 停止並刪除容器（但保留資料庫數據）

docker compose down

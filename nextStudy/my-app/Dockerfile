# ベースイメージ（Node.js入り）
FROM node:18

# 作業ディレクトリ作成
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係インストール
RUN npm install

# 全ファイルをコピー
COPY . .

# 本番ビルド
RUN npm run build

# ポートを開放
EXPOSE 3000

# アプリを起動
CMD ["npm", "run", "start", "-H 0.0.0.0 -p 3000"]

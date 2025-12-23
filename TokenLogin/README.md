# TokenLogin - Revenge Plugin

Discord用のトークンログインプラグインです。複数のアカウントをトークンで管理できます。

## 機能

- `/token login <token>` - トークンを使ってアカウントを追加
- `/token list` - 保存済みのアカウント一覧を表示
- `/token remove <user_id>` - アカウントを削除

## 使い方

### アカウントの追加
```
/token login <your_discord_token>
```

### アカウント一覧の確認
```
/token list
```

### アカウントの削除
```
/token remove <user_id>
```

## インストール

1. このフォルダをRevengeのプラグインディレクトリにコピー
2. Revengeを再起動
3. プラグイン設定でTokenLoginを有効化

## 注意事項

- トークンは機密情報です。他人と共有しないでください
- 不正なトークンの使用はDiscordの利用規約に違反する可能性があります
- 自己責任でご使用ください

## ライセンス

MIT

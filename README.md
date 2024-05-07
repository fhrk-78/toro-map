## 概要

[TORO乗換案内アプリ](https://github.com/TORO-Server/toroapp_transfar) をベースにビジュアルや機能を一新したTOROの交通をまとめたアプリです

## フォルダ

```
root             # 各種コンフィグと公開用ファイルが置いてあります
├─assets         # リソース類全般を保存しています
│  ├─icons         # 開発/ビルドに必要なGoogleIconsのアイコンを入れています (Apache2.0)
│  └─other         # その他のリソースはここに
├─script         # Webpackビルド済みファイルをここに出力する
├─src            # TypeScriptソース
└─stylesheets    # Sassソース
```

## 開発

`npm run build` 開発用ビルド
`npm run prod ` 公開用ビルド

## リリースノート

| バージョン     | 機能              | Web    | 状態   |
| ------------- | ----------------- | ------ | ------ |
| v0.1 (Alpha)  | 鉄道の経路計算機能  | Alpha  | 開発中 |
| v1.0 (Stable) | 道路対応           | Stable | 計画中 |

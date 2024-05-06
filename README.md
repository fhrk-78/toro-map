## 概要
[TORO乗換案内アプリ](https://github.com/TORO-Server/toroapp_transfar) をベースにビジュアルや機能を一新したTOROの交通をまとめたアプリです

## フォルダ
```
root          # 各種コンフィグと公開用ファイルが置いてあります
├─assets      # リソース類全般を保存しています
│  ├─icons      # 開発/ビルドに必要なGoogleIconsのアイコンを入れています (Apache2.0)
│  └─other      # その他のリソースはここに
├─script      # Webpackビルド済みファイルをここに出力する
├─src         # TypeScriptソース
└─stylesheets # SCSSソース
```

## リリースノート
| バージョン     | 機能              | Web    | Windows | Mac  |
| ------------- | ----------------- | ------ | ------- | ---- |
| v0.1 (Alpha)  | 鉄道の経路計算機能  | Alpha  | None   | None |
| v1.0 (Stable) | 道路対応           | Stable | Alpha  | None |

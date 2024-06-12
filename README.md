# TOROMap

## セットアップ

### Node.js/Gitをインストール

### コマンドプロンプトを起動

1行ずつ実行する

```ps1
> git clone https://github.com/TORO-Server/toro-map.git
> cd toro-map
> npm install
> npm run dev
```

## 編集

コマンドプロンプトを起動しながらファイルを編集

`https://localhost:5173` を開くとテストできる

### CSS

CSSの構造：

```txt
│  main
│  # 全体のCSS
│  form
│  # フォーム用CSS
│  general
│  # ボタン等
│
├─views
│ # ページごとのCSS
└─components
  # パーツごとのCSS
```

# TOROMap

## Client セットアップ

Node.js/Gitをインストールする必要があります

### コマンドプロンプトを起動

1行ずつ実行する

```ps1
> git clone https://github.com/TORO-Server/toro-map.git
> cd toro-map
> npm install
> npm run dev
```

### CSS編集

コマンドプロンプトを起動しながらファイルを編集

`https://localhost:5173` を開くとテストできる

CSSの構造：

```txt
│  main
│  # 全体のCSS
│
│  form
│  # フォーム用CSS
│
│  general
│  # ボタン等
│
├─views
│ # ページごとのCSS
└─components
  # パーツごとのCSS
```

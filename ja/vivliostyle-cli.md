# Vivliostyle CLI

Vivliostyle CLI は、HTMLやマークダウン文書を組版するためのコマンドラインインターフェイスです。

## インストール

事前に [Node.js](https://nodejs.org/ja/) (v10 以上、ただし v14.0.0 以外) のインストールが必要です。

次のコマンドで Vivliostyle CLI をインストールできます:

```
npm install -g @vivliostyle/cli
```

## HTML から PDF を生成

`vivliostyle build` コマンドで HTML ファイルを指定すると、HTML から組版した結果の PDF ファイルが出力されます。

```
vivliostyle build index.html
```

デフォルトで出力される PDF ファイル名は "output.pdf" です。

### 出力 PDF ファイルの指定

`-o` (`--output`) オプションで PDF ファイル名を指定できます。

```
vivliostyle build book.html -o book.pdf
```

### ページサイズの指定

`-s` (`--size`) オプションでページサイズを指定できます。指定できるサイズは、A5, A4, A3, B5, B4, JIS-B5, JIS-B4, letter, legal, ledger のいずれか、またはコンマで区切って幅と高さを指定します。

```
vivliostyle build paper.html -s A4 -o paper.pdf
vivliostyle build letter.html -s letter -o letter.pdf
vivliostyle build slide.html -s 10in,7.5in -o slide.pdf
```

### Web の URL の指定

ローカルの HTML ファイルのほか、Web の URL を指定することもできます。

```
vivliostyle build https://vivliostyle.github.io/vivliostyle_doc/samples/gutenberg/Alice.html -s A4 -o Alice.pdf
```

## EPUB から PDF を生成

`vivliostyle build` コマンドで EPUB ファイルを指定すると、EPUB から組版した結果の PDF ファイルが出力されます。

```
vivliostyle build ebpaj-sample.epub -s A5 -o ebpaj-sample.pdf
```

### 解凍された EPUB から PDF を生成

解凍(unzip)された EPUB から PDF を生成するには、EPUB の OPF ファイルを指定します。

```
unzip ebpaj-sample.epub
vivliostyle build item/standard.opf -s A5 -o ebpaj-sample.pdf
```

## Markdown から PDF を生成

`vivliostyle build` コマンドで Markdown ファイルを指定すると、Markdown から組版した結果の PDF ファイルが出力されます。

```
vivliostyle build manuscript.md -s A4 -o paper.pdf
```

### VFM (Vivliostyle Flavored Markdown) について

Vivliostyle CLI で利用可能な Markdown 記法については、[VFM: Vivliostyle Flavored Markdown](https://vivliostyle.github.io/vfm/#/) を参照してください。

### CSS スタイルシートの指定

`-T` (`--theme`) オプションで CSS ファイルを指定することができます。

```
vivliostyle build manuscript.md -T style.css -o paper.pdf
```

## 組版結果のプレビュー

`vivliostyle preview` コマンドで組版結果をブラウザでプレビューすることができます。

```
vivliostyle preview manuscript.md -T style.css
```

## Vivliostyle Themes について

- [Vivliostyle Themes](https://vivliostyle.github.io/themes/)

### Theme を見つける

npm パッケージとして公開されている Theme を見つけるには [npm](https://www.npmjs.com/) でキーワード "vivliostyle-theme" を検索してください:

- [List of Themes (npm)](https://www.npmjs.com/search?q=keywords%3Avivliostyle-theme)

### Theme のインストール

Vivliostyle CLI で npm パッケージとして公開されている Theme を利用するには、そのインストールが必要です。

```
npm install @vivliostyle/theme-techbook
```

### Create Book の利用

Vivliostyle Themes を利用するより簡単な方法は Create Book を使用することです。[Create Book](create-book) を参照してください。

## 構成ファイル vivliostyle.config.js

複数の記事や章ごとのファイルをまとめて１つの出版物を構成するには、構成ファイルを利用します。`vivliostyle build` または `vivliostyle preview` コマンドを実行するとき、カレントディレクトリに構成ファイル `vivliostyle.config.js` があるとそれが使われます。

### 構成ファイルの作成

次のコマンドで構成ファイル `vivliostyle.config.js` を作成することができます。

```
vivliostyle init
```

これでカレントディレクトリに `vivliostyle.config.js` が生成されます。構成ファイルは JavaScript で記述され、これを編集することで様々な設定を変更できます。

### 構成ファイルの設定内容

構成ファイルの設定内容についてはファイル内のコメント（`//` ではじまる）に説明があります。

- **title**: 出版物のタイトル。例: `title: 'Principia'`。
- **author**: 著者名。例: `author: 'Isaac Newton'`。
- **language**: 言語。例: `language: 'en'`。 この指定があると HTML の `lang` 属性に反映されます。
- **size**: ページサイズ。例: `size: 'A4'`。
- **theme**: CSS ファイルを指定します。例: `theme: 'style.css'`、または [Vivliostyle Themes](https://vivliostyle.github.io/themes/) のパッケージ名を指定します。例: `theme: '@vivliostyle/theme-techbook'`。
- **entry**: 入力の Markdown または HTML ファイルの配列を指定します。
    ```js
    entry: [
      'introduction.md',
      'chapter1.md',
      'chapter2.md',
      'glossary.html'
    ],
    ```
    - `entry` の個別の要素に `title` や `theme` の指定が可能です。
        ```js
        entry: [
          {
            path: 'about.md',
            title: 'About This Book',
            theme: 'about.css'
          },
          ...
        ],
        ```
- **output**: 出力先を指定。例: `output: 'output.pdf'`。デフォルトは `{title}.pdf`。次のように複数の出力を指定することも可能:
    ```js
    output: [
      './output.pdf',
      {
        path: './book',
        format: 'webpub',
      },
    ],
    ```
    `webpub` 出力については [Web 出版物 (webpub)](#web-出版物-webpub) を参照してください。
- **workspaceDir**: 中間ファイルを保存するディレクトリを指定。この指定がない場合のデフォルトはカレントディレクトリであり、Markdown から変換された HTML ファイルは Markdown ファイルと同じ場所に保存されます。例: `workspaceDir: '.vivliostyle'`
- **toc**: `toc: true` を指定すると、目次を含む HTML ファイル `index.html` が出力されます。詳しくは [目次の作成](#目次の作成) を参照してください。

## 印刷用 PDF（PDF/X-1a 形式）の生成

`vivliostyle build` コマンドの `--press-ready` オプションにより印刷入稿に適した PDF/X-1a 形式で出力することができます。

この機能を使うためには [Ghostscript](https://www.ghostscript.com) と [Xpdf](https://www.xpdfreader.com/)（または [Poppler](https://poppler.freedesktop.org/)）をインストールする必要があります。主なOSでそれらをインストールする方法は以下です：

macOS ([Homebrew](https://brew.sh/index_ja) を利用):
```
brew install poppler ghostscript
```

Ubuntu:
```
apt-get install poppler-utils ghostscript
```

Windows:
- Ghostscript for Windows を <https://www.ghostscript.com/download/gsdnld.html> からダウンロードしてインストール。それからインストールしたGhostscriptの実行ファイルのあるディレクトリ（例："C:\Program Files\gs\gs9.52\bin"）を `PATH` 環境変数に追加。
- Xpdf command line tools for Windows を <http://www.xpdfreader.com/download.html> からダウンロードしてインストール。それからインストールしたXpdfの実行ファイルのあるディレクトリ（例："C:\xpdf-tools-win-4.02\bin64"）を `PATH` 環境変数に追加。

## PDF の「しおり」(Bookmarks) の生成

`vivliostyle build` コマンドで出力される PDF には、目次の内容が「しおり」(PDF Bookmarks) として生成されます。PDF の「しおり」は、Adobe Acrobat のような PDF 閲覧ソフトで目次ナビゲーションに利用できます。

この「しおり」生成機能は、出版物に目次が含まれるときに有効になります。[EPUB から PDF を生成](#epub-から-pdf-を生成) の場合には、EPUB に含まれる目次が使われます。それ以外については次の [目次の作成](#目次の作成) を参照してください。

## 目次の作成

### 構成ファイルでの目次生成の指定

構成ファイル `vivliostyle.config.js` に `toc: true` の指定がある場合、目次 HTML ファイル `index.html` が生成されて、それが出版物の先頭のファイルになります。

目次 HTML ファイルの名前を指定のものにするには `toc:` にファイル名を指定します。例: `toc: 'toc.html'`

生成される目次 HTML ファイルの内容は次のようになります。

```html
<html>
  <head>
    <title>Book Title</title>
    <link href="publication.json" rel="publication" />
    <link href="style.css" rel="stylesheet" />
  </head>
  <body>
    <h1>Book Title</h1>
    <nav id="toc" role="doc-toc">
      <h2>Table of Contents</h2>
      <ol>
        <li><a href="prologue.html">Prologue</a></li>
        <li><a href="chapter1.html">Chapter 1</a></li>
        <li><a href="chapter2.html">Chapter 2</a></li>
        <li><a href="chapter3.html">Chapter 3</a></li>
        <li><a href="epilogue.html">Epilogue</a></li>
      </ol>
    </nav>
  </body>
</html>
```

### 目次タイトルの指定

- 目次 HTML の `title` と `h1` 要素には、出版物のタイトル（構成ファイルの `title` で指定）が出力されます。
- 目次タイトル（`nav` 要素内の見出し`h2` 要素の内容 "Table of Contents"）は、構成ファイルの `tocTitle` で指定することができます。例: `tocTitle: 'Contents'`。

### 目次を出版物の先頭以外の場所に出力するには

構成ファイル `vivliostyle.config.js` の `entry` の配列の要素として `{ rel: 'contents' }` を指定すると、その位置に目次 HTML ファイルが生成されます。

```js
  entry: [
    'titlepage.md',
    { rel: 'contents' },
    'chapter1.md',
    ...
  ],
  toc: 'toc.html',
```

これで、出版物の先頭の HTML ファイルは `titlepage.html` で、その次に目次の HTML ファイル `toc.html` という順番になります。

### 目次を自分で作成するには

目次を自分で作成するには、次のように、構成ファイルの `entry` の配列の要素として目次のファイルのパスと `rel: 'contents'` を指定してください。

```js
  entry: [
    'titlepage.md',
    {
      path: 'toc.html',
      rel: 'contents'
    },
    'chapter1.md',
    ...
  ],
```

目次の作り方については [W3C Publication Manifest](https://www.w3.org/TR/pub-manifest/) 仕様に付属の [Machine-Processable Table of Contents](https://www.w3.org/TR/pub-manifest/#app-toc-structure) を参照してください。

## Web 出版物 (webpub)

`vivliostyle build` コマンドに `-f` (`--format`） オプションで `webpub` を指定すると、Web 出版物 (webpub) を生成します。出力先 `-o` (`--output`) オプションには webpub を配置するディレクトリを指定します。

（以下の例では、入力の Markdown や HTML ファイルの指定は構成ファイル `vivliostyle.config.js` に記述されているものとします）

```
vivliostyle build -o webpub/ -f webpub
```

生成された webpub ディレクトリ内には出版物マニフェスト `publication.json` ファイルがあり、コンテンツの HTML ファイルの読み込み順などの情報が記述されています。W3C 標準仕様である [Publication Manifest](https://www.w3.org/TR/pub-manifest/) に準拠しています。

webpub は、Web 上で読むことができる出版物を作るのに使えます。また、次のように `publication.json` ファイルを `vivliostyle build` コマンドに指定することで、webpub から PDF を生成することができます。

```
vivliostyle build webpub/publication.json -o pdfbook.pdf
```

また、次のように1回の `vivliostyle build` コマンドで webpub と PDF の両方を生成することもできます。

```
vivliostyle build -o webpub/ -f webpub -o pdfbook.pdf -f pdf
```

## その他のオプション

`vivliostyle help` コマンドで Vivliostyle CLI で利用可能なオプションの一覧を表示できます。

```
vivliostyle help
vivliostyle help init
vivliostyle help build
vivliostyle help preview
```

以下もご覧ください:
- [Vivliostyle CLI (README)](https://github.com/vivliostyle/vivliostyle-cli/blob/main/README.md#readme)

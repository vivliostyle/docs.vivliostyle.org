# ユーザーガイド

```js {mixin:true}
{
  data() {
    return {
      isOnline: false,
    }
  },
  methods: {
    onChangeEventHandler(event) {
      this.isOnline = event.value;
    }
  }
}
```

```js {mixin: true}
Vue.component("Link", {
  props: { isOnline: { type: Boolean, default: true }, path: String },
  template: `
    <a v-bind:href="url+path"><slot>{{url}}{{path}}</slot></a>
  `,
  computed: {
    url() {
      return this.isOnline
        ? "https://vivliostyle.org"
        : `http://localhost:${window.location.port || 80}`;
    }
  }
});
```

<Note label="">
  <toggle-button @change="onChangeEventHandler" :value="true" width="70" :labels="{checked: 'Online', unchecked: 'Local'}"></toggle-button>
</Note>

## Introduction

Vivliostyle Viewer は、HTML+CSS文書を組版・表示するWebアプリケーションです。

## Vivliostyle Viewer

Vivliostyle Viewer をローカル環境で利用する場合は、配布パッケージに同梱の [README](https://github.com/vivliostyle/vivliostyle/blob/master/packages/viewer/README.ja.md)に記載の「使い方」の手順にしたがってWebサーバーを起動してください。

オンラインで公開されている [vivliostyle.org/viewer/](https://vivliostyle.org/viewer/) も利用でき、これは常に最新のリリース版に更新されています。いち早く最新のバージョンを試したい場合は、[vivliostyle.now.sh](https://vivliostyle.now.sh)を利用してください。

パラメータを指定しないで <Link v-bind:isOnline="isOnline" path="/viewer">Vivliostyle Viewer</Link> を開くと、文書URLの入力欄（“Input a document URL”）と次のように使い方の説明が表示されます:

Access to <Link v-bind:isOnline="isOnline" path="/viewer/#x=./samples.html" />.

## サポートされている文書の種類

- (X)HTML文書＋ページメディア用のCSS
- Web出版物（複数のHTML文書からなるコレクション）: プライマリーエントリーページまたはマニフェストファイルのURLを指定します。
- ZIP解凍済みのEPUB: OPFファイルのURLまたは解凍されたEPUBファイルのトップディレクトリを指定します。

### URLパラメータのオプション

- `#b=(document URL)` or `#x=&(document URL)`

  - #**b**= Book view. When (X)HTML document URL is specified, the URL is treated as primary entry page’s, and a series of HTML documents linked from the manifest or TOC (Table of Contents, e.g. marked up with `<nav role="doc-toc">`) are automatically loaded.
  - #**x**= (X)HTML document is simply loaded. Multiple documents can be specified as `#x=(1st HTML)&x=(2nd HTML)...`

- `&spread=[true | false | auto]`
  - true: Spread view
  - false: Single page view
  - auto: Auto spread view (default)
- &amp;renderAllPages=[true |false]
  - true: for Print (all pages printable, page count works as
    expected)
  - false: for Read (quick loading with rough page count)
- &amp;style=&lt;additional external style sheet URL&gt;
- &amp;userStyle=&lt;user style sheet URL&gt;

Options can also be set in the **Settings** panel.

### 留意点

- GitHubとGistのURLを直接指定することができます。そのようなURLが指定された場合、Vivliostyle は github/gist の raw コンテンツをロードします。
- ⚠️Mixedコンテンツ（“http:” のURLが “https:” の Vivliostyle Viewer に指定された場合）は通常ブラウザによってブロックされます。
- ⚠️Cross-Origin（異なるドメインへのリクエスト）は、サーバーが Cross-Origin Resource Sharing (CORS) を許可するように設定されていない限り、通常はブラウザによってブロックされます。

## 表示するHTML文書の指定

### HTML

HTMLファイルを Vivliostyle Viewer で表示するには、Webサーバーが読み込める場所（上記手順にしたがってWebサーバーを起動している場合は、配布パッケージを解凍してできたフォルダ内）にそのファイル（およびそのファイルから読み込まれるCSSや画像ファイル）を置いた上で、次のようにパラメータを付加したURLをブラウザで開きます:

```
⟨Vivliostyle ViewerのURL⟩#x=⟨表示するファイルのURL (Vivliostyle Viewerからの相対)⟩
```

注: Vivliostyle Viewer 本体とは別ドメインの文書を読み込もうとする場合、文書があるWebサーバーの設定によって、文書が読み込めない場合があります。文書を読み込ませるためには、サーバー側で CORS (Cross-Origin Resource Sharing)の設定が必要です。

注: 数式の表示（MathMLおよびTeX形式に対応）にインターネット上のJavaScriptライブラリー([MathJax](https://www.mathjax.org))を使用するため、文書に数式が含まれる場合はインターネット接続が必要です。

例: HTMLファイル [samples/gon/index.html](https://vivliostyle.github.io/vivliostyle_doc/samples/gon/index.html) を表示する場合:

<Link v-bind:isOnline="isOnline" path="/viewer/#x=../samples/gon/index.html" />

テキストボックスに文書ファイルのパス（または URL）を入力すると、その文書を表示する Vivliostyle Viewer のURLを下に表示します:

<input
  id="file-path-input"
  type="text"
  defaultValue="/samples/gon/index.html"
  size="30"
/>

<Link v-bind:isOnline="isOnline" path="/viewer/#x=../samples/gon/index.html" />

### EPUB

Vivliostyle ViewerではZIP解凍済みのEPUBファイルを表示することができます。この場合、次のパラメータを指定します:

```
#b=⟨表示する解凍済みEPUBフォルダのURL (Vivliostyle Viewer からの相対)⟩
```

例: [samples/niimi/](https://vivliostyle.github.io/vivliostyle_doc/samples/niimi/index.html) フォルダに解凍済みのEPUBファイルを表示する場合:

<Link v-bind:isOnline="isOnline" path="/viewer/#b=../samples/niimi/" />

テキストボックスにEPUBフォルダのパス（またはURL）を入力すると、その文書を表示するVivliostyle ViewerのURLを下に表示します:

<input
  id="epub-path-input"
  type="text"
  defaultValue="/samples/niimi/"
  size="30"
/>

<Link v-bind:isOnline="isOnline" path="/viewer/#b=../samples/niimi/" />

GitHub上に公開されているZIP解凍済みのEPUBファイルを表示する例:

- [IDPF/epub3-samples](https://github.com/IDPF/epub3-samples/)の 『[Accessible EPUB 3](https://github.com/IDPF/epub3-samples/tree/master/30/accessible_epub_3/)』

  <Link v-bind:isOnline="isOnline" path="/viewer/#b=https://github.com/IDPF/epub3-samples/tree/master/30/accessible_epub_3/" />

### Web出版物

Vivliostyle ViewerではWeb出版物（複数のHTML文書からなるコレクション）を表示することができます。この場合、次のパラメータを指定します:

```
#b=⟨プライマリーエントリーページのHTML文書またはマニフェストファイルのURL (Vivliostyle Viewer からの相対)⟩
```

Web出版物のマニフェストの形式については、W3Cドラフトの [Web Publications](https://w3c.github.io/wpub/) および [Readium Web Publication Manifest](https://github.com/readium/webpub-manifest/) をサポートしています。

Web出版物のマニフェストが存在しなくても、指定したHTML文書内の目次要素内に他のHTML文書へのリンクがある場合は、それらの文書が自動的にロードされます。Vivliostyle はHTML文書内の次のCSSセレクタにマッチする要素を目次要素として扱います:
`[role=doc-toc], [role=directory], nav li, .toc, #toc`

Web上に公開されている複数のHTML文書からなる出版物を表示する例:

- [CSS Working Group Editor Drafts](https://drafts.csswg.org/) の 『[Cascading Style Sheets Level 2 Revision 2 (CSS 2.2) Specification](https://drafts.csswg.org/css2/)』

  <Link v-bind:isOnline="isOnline" path="/viewer/#b=https://drafts.csswg.org/css2/" />

## 詳細な設定

### 見開きビューモード

Vivliostyle Viewer は、表示領域の横幅が大きいとき（高さの1.45倍以上）、自動的に見開きページ表示にします。これを変えるには次の指定をURLに追加します:

```
&spread=true（常に見開きページ表示）
```

```
&spread=false（常に単ページ表示）
```

```
&spread=auto（自動切り替え＝デフォルト）
```

Vivliostyle Viewer の設定パネル（画面右上のアイコン <img src="/images/logo.png" width="16" height="16" alt="[Setting]" /> をクリックして開く）でも、ページ表示モードの変更ができます。

### スタイルシートの追加

HTMLファイルに指定されているスタイルシートに加えて、追加のスタイルシート（CSSファイル）を使うには、次の指定をURLに追加します:

```
&style=⟨スタイルシートのURL (Vivliostyle Viewer からの相対)⟩
```

この方法で指定したスタイルシートは、HTMLファイルで指定されているスタイルシートと同様（制作者スタイルシート）の扱いで、よりあとに指定されたことになるので、CSSのカスケーディング規則により、HTMLファイルからのスタイルの指定を上書きすることになります。

これに対して、次のようにしてユーザースタイルシート（スタイル指定に `!important` を付けないかぎり、制作者スタイルシートのスタイル指定を上書きしない）の指定もできます:

```
&userStyle=⟨ユーザースタイルシートのURL (Vivliostyle Viewer からの相対)⟩
```

複数個の `&style=` あるいは `&userStyle=` を使うことで、複数個のスタイルシートを指定できます。

データURLも利用できます。例えば:

```
&userStyle=data:,html{writing-mode:vertical-rl}
```

ユーザースタイルの設定は、設定パネルの **User Style Preferences** からも行うことができます。設定内容のCSSは設定パネルの **CSS Details** で確認することができます。

Web上に公開されている文書に、設定パネルからユーザースタイルの設定を加えた例:

- [CSS Working Group Editor Drafts](https://drafts.csswg.org/) の 『[Cascading Style Sheets Level 2 Revision 2 (CSS 2.2) Specification](https://drafts.csswg.org/css2/)』

  <Link v-bind:isOnline="isOnline" path="/viewer/#b=https://drafts.csswg.org/css2/&userStyle=data:,/*%3Cviewer%3E*/%0A@page%20%7B%20size:%20A4;%20%7D%0A/*%3C/viewer%3E*/%0A%0A@page%20:first%20%7B%0A%20%20@top-left%20%7B%0A%20%20%20%20content:%20none;%0A%20%20%7D%0A%20%20@top-right%20%7B%0A%20%20%20%20content:%20none;%0A%20%20%7D%0A%20%20@bottom-center%20%7B%0A%20%20%20%20content:%20none;%0A%20%20%7D%0A%7D%0A%0A@page%20:left%20%7B%0A%20%20font-size:%200.8rem;%0A%20%20@top-left%20%7B%0A%20%20%20%20content:%20env(pub-title);%0A%20%20%7D%0A%20%20@bottom-center%20%7B%0A%20%20%20%20content:%20counter(page);%0A%20%20%7D%0A%7D%0A%0A@page%20:right%20%7B%0A%20%20font-size:%200.8rem;%0A%20%20@top-right%20%7B%0A%20%20%20%20content:%20env(doc-title);%0A%20%20%7D%0A%20%20@bottom-center%20%7B%0A%20%20%20%20content:%20counter(page);%0A%20%20%7D%0A%7D&renderAllPages=true">
    #b=https://drafts.csswg.org/css2/&userStyle=data:,CSS
  </AdaptiveLink>

```
#b=(URL)&renderAllPages=true&userStyle=data:,/*<viewer>*/
@page { size: A4; }
/*</viewer>*/

@page :first {
  @top-left {
    content: none;
  }
  @top-right {
    content: none;
  }
  @bottom-center {
    content: none;
  }
}

@page :left {
  font-size: 0.8rem;
  @top-left {
    content: env(pub-title);
  }
  @bottom-center {
    content: counter(page);
  }
}

@page :right {
  font-size: 0.8rem;
  @top-right {
    content: env(doc-title);
  }
  @bottom-center {
    content: counter(page);
  }
}
```

この例のように、設定パネルからスタイルの設定を行うと、ユーザースタイルのCSS内のコメント `/*<viewer>*/` と `/*</viewer>*/` で囲んだ部分に、設定パネルの項目から設定したスタイルのCSSコードが生成され、設定パネルの **CSS Details** に表示されます。ユーザー独自のCSSコードをそれに追加することができます。この例ではページヘッダーとページフッターを追加しています。

## PDFとして出力・印刷

ブラウザの印刷・PDF保存機能を利用して、レンダリングされたドキュメントをPDFに変換できます。

例えば、Google Chrome で PDF に出力するには、メニューから「印刷」を開き、出力先として「PDFに保存」、背景のグラフィック ON と指定して「保存」します。

注: 文書の全ページを印刷する場合、設定パネルで **Render All Pages** が On になっていることを確認してください。これが Off の場合、すでに表示されたページしか印刷できず、またページ番号が正しく出力されません。

## サポートされているCSSの機能

VivliostyleがサポートするCSSの機能については [Supported features](./supported-features.md) を参照してください。

<Samples />

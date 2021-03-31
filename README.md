# StaticMarkupLanguage-Utility

Static Template Engine (Under Construction)

Web(html)静的発行ユーティリティ(開発中)

README整備中・・

![Image](https://ltside.com/filename/img/sml-concept.png)

## 導入方法

git, node が入っている環境で実施する

- git ソースをクローンする

- コマンド実行

```
npm install
```

## 利用方法

- コマンド実行

```
npm run staticml
```

## フォルダ構成

### [ルート]/data

Excel(xlsx), json, yml 対応

Excel(filename.xlsx)でヘッダーを「key, value」とした場合、 `data/filename.xls/sheetname/key列の値` とセットすると対応する値がセットされる

表要素としての呼び出しはシートの表現がまるまる利用可能。 `sml-loop` , `sml-pagination` で利用する

### [ルート]/template

入力。元となるhtmlテンプレートをセットする

### [ルート]/pubilc

出力。データが反映されたhtmlが発行される

## タグ要素機能

### sml-html

タグにセットするとそのタグ内のhtmlが置き換わる

Template(input):
```
<div sml-html="replacement">...</div>
<a sml-html="data/filename.xlsx/title">...</a>  // ex: title = abc 
```

Public(output):
```
<div sml-html="replacement">replacement</div>
<a sml-html="data/filename.xlsx/title">abc</a>
```

### sml-append, sml-prepend

sml-htmlと同様。appendは追記, prependは前方追記

### sml-attr

要素を置き換える。部分置換も可能

Template(input):
```
<div sml-attr="test-a:data1;test-b:data2">...</div>
<div sml-attr="test-c/repl:done" test-c="data3,repl,ace">...</div>
```

Public(output):
```
<div sml-attr="test1:data1;test2:data2" test-a="data1" test-b="data2">...</div>
<div sml-attr="test-c/repl:done" test-c="data3,done,ace">...</div>
```

### sml-class

クラス要素を操作する

Template(input):
```
<div sml-class="add:abc;remove:def" class="def ghy">
```

Public(output):
```
<div sml-class="add:abc;remove:def" class="ghy abc">
```

### sml-loop

表をループする。`sml-loop` にループしたいシート名をセットすると、データが変数のルート領域 `data/***` にセットされる
`sml-item` がセットされた最初の要素のみを利用してループし、それ以外は無視（削除）される

`sml-loop-ref` を利用してデータリファレンスも可能（説明は準備中）

ex: filename.xlsx / Sheet：sheetname
|タイトル|説明|
|-|-|
|title1|abc|
|title2|def|

Template(input):
```
<div sml-loop="data/filename.xlsx/sheetname">
    <div sml-item="">
        <div sml-html="data/タイトル">sample1-title</div>
        <div sml-html="data/説明">sample1-description</div>
    </div>
    <div>
        <div>sample2-title</div>
        <div>sample2-description</div>
    </div>
    <div>
        <div>sample3-title</div>
        <div>sample3-description</div>
    </div>
</div>
```

Public(output):
```
<div sml-loop="data/filename.xlsx/sheetname">
    <div sml-item="">
        <div sml-html="data/タイトル">title1</div>
        <div sml-html="data/説明">abc</div>
    </div>
    <div sml-item="">
        <div sml-html="data/タイトル">title2</div>
        <div sml-html="data/説明">def</div>
    </div>
</div>
```

### sml-if

要素の値が正の場合のみ表示する

Template(input):
```
<div sml-if="data/false"> // falseは既存定数で予約後です
```

Public(output):
```
(非表示)
```

## ページ制御機能

### sml-define

定数を定義する

ページ内で変数のルート領域 `data/***`  にセットする

Template(input):
```
<meta sml-define="page_cat" sml-define-value="all" />
```

Public(output):
```
<meta sml-define="page_cat" sml-define-value="all" />
（data/page_cat）に値（all）がセットされる
```

### sml-pagination

ページネーション（ページ機能）を実施する

Template(input):
pagename_[page].html
```
<meta sml-pagination-src="data/filename.xlsx/sheetname" sml-pagination-page-cnt="5">

<div sml-loop="data/filename.xlsx/sheetname">
    ...
</div>

<button sml-attr="onclick/[link]:pagename_{data/pagination/prev}.html" sml-if="data/pagination/is_prev" class="primary-button pull-left" onclick="location.href='[link]'">
    ＜＜　BACK
</button>
<button sml-attr="onclick/[link]:pagename_{data/pagination/next}.html" sml-if="data/pagination/is_next" class="primary-button center-block" onclick="location.href='[link]'">
    NEXT　＞＞
</button>
```

## インクルード機能

## <!-- #sml-include-[pagename]/[key] -->

ページ記載の全てにおいて対応する[pagename]の該当箇所に置き換える

※Template側を編集するので注意

Template(input):
```
<!-- #sml-include-pagename.html/key -->
....
<!-- #/sml-include-pagename.html/key -->
```

pagename.html 以外は pagename.htmlの該当エリアのhtmlが上書きされる
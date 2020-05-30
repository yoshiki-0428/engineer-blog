---
template: post
title: DarkModeのCSSを適用させる
slug: start-gatsby-blog-share-darkmode
draft: false
date: 2020-05-29T21:36:43.318Z
category: Programming
tags:
  - CSS
  - Gatsby
  - DarkMode
---
# はじめに

この記事は[Gatsby](https://www.gatsbyjs.org/)というヘッドレスCMS技術で構成されています。今回は「エンジニア初心者でもできる」を前提に以下の構成で記事を作成していこうと思います。

* [Gatsby始めるまで](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog/)
* [GatsbyにShare機能、OGPタグをつける](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog-share/)
* [タグ機能、カテゴリ機能をつける（基礎編）](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog-add-tags)
* [タグ機能、カテゴリ機能をつける（応用編）](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog-add-tags-application)
* [GatsbyにTableOfContents（目次）をつける](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog-tableofcontent)
* [DarkModeをつける](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog-darkmode)（本記事）

# 内容

DarkModeかっこいいですよね。私は大抵のアプリのテーマをDarkModeにして使用しています。みなさんはどうでしょうか？目にも良くて簡単におしゃれになるDarkModeをブログに取り入れてみましょう！

こんな内容になっています。

* GatsbyのPluginで適用する
* 素のCSSを使った方法
* SCSSでも適用できる方法

## GatsbyのPluginで適用する

これが一番手っ取り早いかもしれません。

### gatsby-plugin-dark-modeをインストール

`yarn add gatsby-plugin-dark-mode`

```js
// gatsby-config.js

module.exports = {
  plugins: ['gatsby-plugin-dark-mode'],
}
```

### 使い方

`ThemeToggler`をImportしたコンポーネントを作成します。

```js
import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

class MyComponent extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
            />{' '}
            Dark mode
          </label>
        )}
      </ThemeToggler>
    )
  }
}
```

このPluginはLocalStorageでDarkかそれ以外かを判断しているみたいです。

### global.cssを修正する

global.cssがない場合は、bodyタグでメインカラーを制御しているファイルを見つけて以下のように修正しましょう。

```css
/* global.css */

body {
  --bg: white;
  --textNormal: #222;
  --textTitle: #222;
  --textLink: blue;
  --hr: hsla(0, 0%, 0%, 0.2);

  background-color: var(--bg);
}

body.dark {
  -webkit-font-smoothing: antialiased;

  --bg: darkslategray;
  --textNormal: rgba(255, 255, 255, 0.88);
  --textTitle: white;
  --textLink: yellow;
  --hr: hsla(0, 0%, 100%, 0.2);
}
```

### Layout.jsを修正する

CSSまで適用させたらあとはその変数を使用するだけです。Layout.jsを変更しましょう。

```js
class Layout extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--textNormal)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
        }}
      >
        ...
      </div>
    )
  }
}
```

## 素のCSSを使った方法

この方法は動的にCSSを変更できませんが、ユーザデバイスの設定に応じてテーマを変えることができます。

メリットとしては「**素のCSSで構成されている**, **コストが低いのでとりあえず導入したい**」になります。

## cssの変更

まずは皆さんのプロジェクトの**bodyタグ**もしくは**root：**に設定されてるCSSを確認してください。

確認ができたら以下のCSSを加えていきましょう。

```css
@media (prefers-color-scheme: light) {
  --theme-base: white;
  --theme-font: black;
  --theme-accent: red;
}

@media (prefers-color-scheme: dark) {
  --theme-base: black;
  --theme-font: white;
  --theme-accent: pink;
}

body {
  background-color: var(--them-base);
  color: var(--them-font);
}
```

> prefers-color-scheme は CSS のメディア特性で、ユーザーがシステムに要求したカラーテーマが明色か暗色かを検出するために使用します。

とのことなので各デバイスの設定状況によって**prefers-color-scheme**の設定値が変わるということですね。ユーザデバイスに準拠するのでこのCSSだけでは手動で変更できませんが、最低限の対応としては良いと思います。

## IEは。。。

やはりかというべきかIEは非対応とのことなのであしからず。。。というか無視しましょう！ｗ

![](https://ucarecdn.com/5b43e3ec-9378-4cbc-ae60-15823b718789/)

## SCSSでも適用できる方法

先程のCSS変数を使用した応用になります。CSS変数をSCSS変数にラップしてあげればいいです。

```scss
// variables.scss
:root{
  @media (prefers-color-scheme: light) {
    --color-base: #222;
    --color-primary: #5D93FF;
    --color-secondary: #F7A046;
    --color_background-base: #FFF;
  }
  @media (prefers-color-scheme: dark) {
    --color-base: #FFF;
    --color-primary: #5D93FF;
    --color-secondary: #F7A046;
    --color_background-base: #282828;
  }
  @media (prefers-color-scheme: no-preference) {
    --color-base: #FFF;
    --color-primary: #5D93FF;
    --color-secondary: #F7A046;
    --color_background-base: #282828;
  }
}

$color-base: var(--color-base);
$color-primary: var(--color-primary);
$color-secondary: var(--color-secondary);
$color_background-base: var(--color_background-base);
```

## やってみた

### MacがDarkModeのとき

![](https://ucarecdn.com/f6f0029e-46f3-4054-80f9-f19befd15e1b/)

### MacがLightModeのとき

![](https://ucarecdn.com/426f281b-167e-4dcd-8229-b20c513358e7/)

# まとめ

いかがでしたでしょうか。今回Gatsbyに限らず一般のCSSでも使用できる方法も合わせて紹介しました。状況に応じて必要なのを低コストで実現できると時間も取られないので良いですね！

一旦Gatsby特集は終わりますが、ちょいちょい自分でカスタマイズしていく予定なのでその度にご紹介できればと思います〜。それではまた。

## 参考

* [gatsby-plugin-dark-mode](https://www.gatsbyjs.org/packages/gatsby-plugin-dark-mode/)
* [prefers-color-scheme](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme)
* [Webのダークモード対応をSCSS変数で管理する方法を考える](https://qiita.com/psephopaikes/items/d1d8f19b8a77d3ee3810)
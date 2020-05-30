---
template: post
title: DarkModeのCSSを適用させる
slug: start-gatsby-blog-share-darkmode
draft: true
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

今回は素のCSSでも使えるダークモードの適用方法を共有します。一旦取り入れたい！という人におすすめです。

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

## 参考

https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme

## IEは。。。

やはりかというべきかIEは非対応とのことなのであしからず。。。

![](https://ucarecdn.com/5b43e3ec-9378-4cbc-ae60-15823b718789/)

# まとめ

今回一番コストの低い方法でご紹介しました。ボタンで切り替える方法も実装できるので機会があったらこのブログにも追加してみようと思います。
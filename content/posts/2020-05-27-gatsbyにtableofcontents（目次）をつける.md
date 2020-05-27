---
template: post
title: GatsbyにTableOfContents（目次）をつける
slug: start-gatsby-blog-tableofcontent
draft: false
date: 2020-05-28T22:30:41.748Z
category: Programming
tags:
  - Gatsby
  - CMS
  - Toc
socialImage: https://ucarecdn.com/1c3706e0-1090-48c1-ad74-f10e9cbce307/
---
# はじめに

この記事は[Gatsby](https://www.gatsbyjs.org/)というヘッドレスCMS技術で構成されています。今回は「エンジニア初心者でもできる」を前提に以下の構成で記事を作成していこうと思います。

* [Gatsby始めるまで](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog/)
* [GatsbyにShare機能、OGPタグをつける](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog-share/)
* [タグ機能、カテゴリ機能をつける（基礎編）](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog-add-tags)
* [タグ機能、カテゴリ機能をつける（応用編）](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog-add-tags-application)
* [GatsbyにTableOfContents（目次）をつける](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog-tableofcontent)（本記事）
* DarkModeをつける（別記事予定）

# 内容

前回はタグ一覧と記事一覧のコンポーネントを同時に出すGrapuQLクエリーの応用まで行いました。

今回はブログで欠かせないTableOfContents（目次）の実装方法のご紹介です。全く難しくないのでササッと行きましょう！

![](https://ucarecdn.com/94b024f1-760a-471c-875c-0ba1f4a2ed71/)

## クエリー

超簡単です。記事を取得しているクエリーに**tableOfContents**を付け足すだけです。エディタで結果を確認してみましょう。

```graphql
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
        socialImage
      }
      tableOfContents
    }
  }
```

![](https://ucarecdn.com/d9fbac98-d126-4772-a731-dfb1b217cc57/)

このようにHTML形式のデータを取得することができました。あとは表示するだけです。

## コンポーネント作成

TOCを表示するコンポーネントつくりです。

ちなみになぜコンポーネントにするのか？理由は単純で

- 使い回しがしやすい
- CSSの設定を限定的にできる
- パーツを好きなところに配置しやすくなる

からです。パーツ１つ１つの依存度を下げていきましょう。

下のように**dangerouslySetInnerHTML={{ __html: tableOfContents }}**に先程取得したHTMLデータを流し込みましょう。（CSSの設定はお好みで設定してください）

```js
const Toc = ({ tableOfContents, gridArea }: Props) => (
  <div className={styles.toc} dangerouslySetInnerHTML={{ __html: tableOfContents }} style={gridArea} />
);

export default Toc;
```

# まとめ

いかがだったでしょうか？

他にも[gatsby-remark-toc](https://github.com/DSchau/gatsby-remark-toc)などのライブラリがあるみたいですが、私個人としてはこちらの方がシンプルで簡潔だと考えています。それでは次回の記事で。

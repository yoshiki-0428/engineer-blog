---
template: post
title: GatsbyにShare機能(OGPタグ)をつける
slug: start-gatsby-blog-share
draft: false
date: 2020-05-25T14:46:03.023Z
category: Programming
tags:
  - Gatsby
  - CMS
  - Twitter
  - OGP
socialImage: https://ucarecdn.com/4f2366fa-cfd4-4e97-9d20-c08013970579/-/preview/-/enhance/50/
---
# はじめに

この記事は[Gatsby](https://www.gatsbyjs.org/)というヘッドレスCMS技術で構成されています。今回は「エンジニア初心者でもできる」を前提に以下の構成で記事を作成していこうと思います。

* [Gatsby始めるまで](https://tech-blog.yoshikiohashi.dev/posts/start-gatsby-blog/)
* GatsbyにShare機能をつける（本記事）
* タグ機能、カテゴリ機能をつける（別記事予定）
* TableOfContents（目次）をつける（別記事予定）
* Metaタグをつける（TwitterのOGPなど）（別記事予定）
* DarkModeをつける（別記事予定）

# 内容

今回はWordPressのシェアボタンなんかでよくあるSNSへのシェアボタンとOGP設定タグの付け方を解説していきます。

![](https://ucarecdn.com/448302fd-7d6b-4bf9-bb9e-ca78f105e256/)

> SNSへのシェアボタン

![](https://ucarecdn.com/71337559-8dae-4f19-afe4-10c1115ce6f1/)

> OGP設定タグ

## SNSシェアボタンを実装する

### react-shareのインストール

めっちゃ簡単です。まずライブラリをインストール。
```
yarn add react-share
```

### ShareSns.jsのコンポーネントの作成

適当なディレクトリを作成して（ここでは`ShareSns`とします）

```javascript
export const ShareSns = ({ articleUrl, articleTitle }) => (
  <div className={'ShareSns'}>
    <div>
      <FacebookShareButton url={articleUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LineShareButton url={articleUrl}>
        <LineIcon size={32} round />
      </LineShareButton>

      <LinkedinShareButton url={articleUrl}>
        <LinkedinIcon title={articleTitle} size={32} round />
      </LinkedinShareButton>

      <TwitterShareButton title={articleTitle} via="yoshiki__0428" url={articleUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  </div>
);
```

### 呼び出し方

ちょっと呼び出し方がもどかしいですが、Gatsby buildをするときに`window.location.href`が未定義なのでビルド時に落ちてしまいます。そのため、typeofで確認する必要があります。

```js
{typeof window !== 'undefined' && window.location.href &&
  <ShareSns articleUrl={window.location.href} articleTitle={title} />
}
```

もしくは呼び出し前にundifinedチェックをして値が存在するか事前に確認しても良いと思います。

```js
const windowUrl = (typeof window !== 'undefined' && window.location.href) ? window : '';
```

これで下のようなボタンが表示されるはずです。他にも色々なSNSのボタンがあるので使ってみてはいかがでしょうか。

![](https://ucarecdn.com/448302fd-7d6b-4bf9-bb9e-ca78f105e256/)

## OGP設定タグ

### react-helmetのインストール

大抵のTemplateには入っているのでやらなくても良いかもです。
```
yarn add react-helmet
```

### Metaタグ専用のコンポーネントの作成

使い方は簡単です。`Helmetタグ`を作成し、そこに必要な`Metaタグ`を入力すればOKです。

この例ではOGとTwitterのOGPを設定しています。呼び出し元は画像データやタイトルデータが取得できる記事画面で呼び出すと良いと思います。Templateによって設計がまちまちなので環境に合わせて適用してみてください。
```js
<Helmet>
  <html lang="jp" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:site_name" content={title} />
  <meta property="og:image" content={image} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</Helmet>
```

### OGPタグの設定確認

netlifyにアップロードしたら[Twitterのカード情報が確認できるサイト](https://ogp.buta3.net/)で対象のURLを入力して確認してみましょう。設定できていればOKです。Slackのチャットなんかにも投稿しても確認できます。

# まとめ

いかがだったでしょうか？結構簡単に設定できたんじゃないかなと思います。ここらへんの機能もブログをやるのであれば必須なので是非やっておきましょう。それでは次回の記事で。


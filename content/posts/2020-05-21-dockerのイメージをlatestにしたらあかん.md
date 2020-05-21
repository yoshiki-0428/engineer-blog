---
template: post
title: dockerのイメージをLatestにしたらあかん
slug: docker-1.41-is-too-new
draft: false
date: 2020-05-21T10:24:11.603Z
category: Programming
tags:
  - Docker
  - Dev ops
socialImage: https://ucarecdn.com/f99ace25-5fb1-49c5-817b-659877811fb4/
---
## dockerのイメージをLatestにしたらあかん

ある日こんなエラーが。。。
```
Error response from daemon: client version 1.40 is too new. Maximum supported API version is 1.39
```

ああ。。。
```
image: docker
```

この意味合いは  `docker:latest` なので公式がイメージを更新したらそのバージョンに変わってしまうのでバージョンはなるべく固定しましょう。

## 1.39以前の安定版 
ちなみに `18.09` のバージョンに固定したらうまくPushできた。
```
image: docker:18.09
```

## まとめ

`Latest = 最新版`だけど、`最新版 = 必ず動く`じゃないのよね。。バージョンには気をつけましょう。
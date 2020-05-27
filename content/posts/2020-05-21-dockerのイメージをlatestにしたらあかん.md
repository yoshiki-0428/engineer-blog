---
template: post
title: dockerのイメージをLatestにしたらあかん
slug: docker-1.41-is-too-new
draft: false
date: 2020-05-22T10:24:11.603Z
category: Programming
tags:
  - Docker
  - Dev Ops
socialImage: https://ucarecdn.com/f99ace25-5fb1-49c5-817b-659877811fb4/
---
## dockerのイメージをLatestにしたらあかん

ある日GitLab CIで特定の環境に**docker push hoge**のコマンドを実行したらこんなエラーが。。。
```
Error response from daemon: client version 1.40 is too new. Maximum supported API version is 1.39
```

**.gitlab-ci.yml**のイメージの指定を見たら以下のような記述に。。。ああ。。
```
image: docker
```

この意味合いはイメージの指定が **docker:latest** なので公式の最新版になるので、公式がイメージを更新したら使えなくなることがあるので、
基本的にはイメージのタグは固定しておきましょう (実際は面倒くさくて忘れがち。。)

## 1.39以前の安定版 

ちなみに **18.09** のバージョンに固定したらうまくPushできた。
```
image: docker:18.09
```

## まとめ

**Latest = 最新版**だけど、**最新版 = 必ず動く**じゃないのよね。。バージョンには気をつけましょう。

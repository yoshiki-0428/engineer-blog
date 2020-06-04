---
template: post
title: WebhookのEndpointをLambdaでつくる
slug: webhook-endpoint-lambda
draft: false
date: 2020-06-04T14:14:41.187Z
category: Programming
tags:
  - AWS
  - Lambda
  - Webhook
socialImage: https://ucarecdn.com/ce66c6a5-cd58-43b2-8b72-317d063c1b16/
---
# はじめに

エンジニアの皆さんWebhook使っていますか？というかほとんどのエンジニアが自然と使っていますよね。

今回はSlackなどのWebhook EndpointをAWS Lambdaで自作してしまおうという内容です！

# 内容

## そもそもWebhookとは

Webアプリケーションでイベントが実行された際、外部サービスにHTTP POSTで通知する仕組みです。

Slackなどの特定のイベントが発火されたら別のAPIサーバに対してHTTP POSTのリクエストを行う仕組みのことですね。

## AWS API GatewayとLambdaを使用してPostエンドポイントの作成

まずはAWS Consoleにサインインしましょう。

### Lambdaの作成

Lambdaを作成します。Lambdaとは一言でいうと**関数**のことです。「WebhookをトリガーにLambdaで処理を行う」ための肝心の処理部分をLambdaで作成します。

今回は手動で作成することが前提です。

Lambdaを作成して、「一から作成」をクリックしてLambdaを作成しましょう。

名前とかは何でもいいのでとりあえずPythonにしておきます。

![](https://ucarecdn.com/2eb3b3bb-8e40-4d29-8f23-3feba0b0d38d/)

ソースコードはとりあえずログを表示するだけのコードです。

```python
import json

def lambda_handler(event, context):
    payload = json.dumps(event)
    print('Payload ' + payload)
```

### API Gatewayの作成

API Gatewayを検索してAPIを作成します。

![](https://ucarecdn.com/5a92de16-eb3b-41f1-b00d-583d1d7a9246/)

今回は**REST**を選択してAPIを作成。

そしたら、アクションを選択してメソッドの作成を選択。

![](https://ucarecdn.com/2e752d09-df7e-45d1-a57b-33c1c9007181/)

ここで先ほど作成したLambdaとつなげましょう。関数の名前とリンクしているようです。

![](https://ucarecdn.com/34a114ee-62c6-4dbe-a4df-53f824d784d2/)

Lambdaのページに行ってつながっているか確認しましょう。こんな図になっていたらOKです。

![](https://ucarecdn.com/7f68a74b-1328-4bf9-bc21-469c03ad3405/)

あとはAPIをデプロイするだけです。

![](https://ucarecdn.com/7d42e3d6-6d7b-40d5-9e19-f24c634544cf/)

> エンドポイントが公開されることになるのでセキュリティ無設定で公開すること早めておきましょう。今回は検証なのでそのままです。

### ローカルでPostして動作するか確認する

curlでPostしてみましょう。

```sh
$ curl -X POST -H "Content-Type: application/json" -d '{"message":"it is test"}'  https://{your-api-gateway-domain}.us-east-1.amazonaws.com/
```

ログにPostしたデータが表示されているはずです。

# まとめ

最速で5分もかからずにAPI Postエンドポイントを作成することができました。ちょっとした処理とかだったらすぐ作れるのでホント便利ですねー。

ここまでできたらあとは、esa.ioの記事作成のイベントをwebhookでAWS側で保存したり、Slackに通知したりと幅が広がるので知っておくとお得ですね🤗


# 参考

* [Webhookとは](https://kintone-blog.cybozu.co.jp/developer/000283.html#:~:text=Webhook%E3%81%A8%E3%81%AF%EF%BC%88%E7%95%A5%EF%BC%89%E3%80%81,%E3%81%A7%E9%80%9A%E7%9F%A5%E3%81%99%E3%82%8B%E4%BB%95%E7%B5%84%E3%81%BF%E3%81%A7%E3%81%99%E3%80%82)
Phone の製品情報を返却する API 群です。
・製品情報の取得
　- メソッド:get
　- URL:/phones
　- リクエスト方法
　 - 全製品返却：クエリ無し
　 - 特定の 1 件返却：クエリ付与（/phones?id=XXX）
　- レスポンス形式：リスト形式
　 - リスト[0]：メッセージ
　 - リスト[1]：リクエストに応じた製品情報

・製品情報の追加
　- メソッド:post
　- URL:/phones
　- リクエスト方法
　 body 部に、{phone_name:XXX, feature:XXX}を付与
　- レスポンス形式：リスト形式
　 - リスト[0]：メッセージ
　 - リスト[1]：追加した製品情報

・製品情報の更新
　- メソッド:patch（既存のデータあり）/put（既存のデータの有無不明）
　- URL:/phones
　- リクエスト方法
　 body 部に、{id:XXX, phone_name:XXX, feature:XXX}を付与
　- レスポンス形式：リスト形式
　 - リスト[0]：メッセージ
　 - リスト[1]：更新/追加した製品情報

・製品情報の削除
　- メソッド:delete
　- URL:/phones
　- リクエスト body：{id:XXX}
　- リクエスト方法
　 body 部に、{id:XXX}を付与
　- レスポンス形式：リスト形式
　 - リスト[0]：メッセージ
　 - リスト[1]：全製品情報
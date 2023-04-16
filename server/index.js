const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const FakeDb = require("./fake-db");

const productRoutes = require("./routes/products");

mongoose
  .connect(
    config.DB_URI
    //   , {
    //   userNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => {
    //DB接続後の初期処理
    const fakeDb = new FakeDb();
    fakeDb.initDb();
    console.log("Connected!");
  });
// 直書きはせずにdev.jsにエンドポイントを入力する（dev.jsはgitignoreに登録しGitにはあげない。）
// mongoose
//   .connect(
//     "mongodb+srv://userID:password@clusterX.XXXXXXX.mongodb.net/?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("Connected!"));

const app = express();
app.use("/api/v1/products", productRoutes);

//Postman側の疎通テスト（Getで通信でjsonが出力される）※実際は上記のapp.useでAPIのエンドポイントごとに実行する関数を分けている
// app.get("/products", function (req, res) {
//   res.json({ success: true });
// });

const PORT = process.env.PORT || "3001";

//疎通テストのでバックログ用
app.listen(PORT, function () {
  console.log("Iam running!!!!!");
});

// mongodb+srv://test:<password>@cluster0.fkuao29.mongodb.net/?retryWrites=true&w=majority

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/index");
const FakeDb = require("./fake-db");

const productRoutes = require("./routes/products");
const path = require("path");

mongoose
  .connect(
    config.DB_URI
    //   , {
    //   userNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => {
    //開発DB接続時の設定
    if (process.env.NODE_ENV !== "production") {
      //DB接続後の初期処理
      const fakeDb = new FakeDb();
      // fakeDb.initDb();
      console.log("Connected!");
    }
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

//本番DB接続時の設定
if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "dist", "sample_site");
  app.use(express.static(appPath));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.PORT || "3001";

//疎通テストのでバックログ用
app.listen(PORT, function () {
  console.log("Iam running!!!!!");
});

// mongodb+srv://test:<password>@cluster0.fkuao29.mongodb.net/?retryWrites=true&w=majority

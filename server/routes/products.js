const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// 最新バージョン補足：コールバック関数がサポートされなくなったためasync/await関数を指定する必要がある

// getされてきたエンドポイントによってDB取得情報を変える
//エンドポイントがNULLの場合　→　全商品情報を取得する
router.get("", async function (req, res) {
  foundProducts = await Product.find(); //find関数：DBからProduct情報を見つけ出す関数
  res.json(foundProducts);
});

//エンドポイントが特定の商品の場合　→　対象の商品情報のみ取得する
router.get("/:productId", async function (req, res) {
  const productId = req.params.productId;
  try {
    foundProduct = await Product.findById(productId);
    return res.json(foundProduct);
  } catch (err) {
    // 存在しないproductIdでURLを叩いた場合：errorハンドリングでhttpステータス422を出力させる
    return res.status(422).send({
      errors: [{ title: "Product error", detail: "Product not found!" }],
    });
  }
});

//初期構築メモ：エンドポイントが特定の商品の場合　→　対象の商品情報のみ取得する
// router.get("/:productId", async function (req, res) {
//   const productId = req.params.productId; //get内(URL内) のproductidを取得する
//   foundProducts = await Product.findById(productId); //findById関数：DBからDynamoDBで自動割り当てしているIDを探し情報取得する
//   res.json(foundProducts);
// });

module.exports = router;

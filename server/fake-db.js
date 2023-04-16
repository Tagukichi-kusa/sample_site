const Product = require("./model/product");

class FakeDb {
  constructor() {
    this.products = [
      {
        coverImage: "./assets/img/phone-cover.jpg",
        name: "Phone XL",
        price: 799,
        description: "A large phone with one of the best screens",
        heding1: "サンプル１です",
        heding2: "サンプル２です",
        heding3: "サンプル３です",
        hedingtext1: "サンプル１の説明文です",
        hedingtext2: "サンプル２の説明文です",
        hedingtext3: "サンプル３の説明文です",
      },
      {
        coverImage: "./assets/img/phone-cover.jpg",
        name: "Phone Mini",
        price: 699,
        description: "A great phone with one of the best cameras",
        heding1: "サンプル１です",
        heding2: "サンプル２です",
        heding3: "サンプル３です",
        hedingtext1: "サンプル１の説明文です",
        hedingtext2: "サンプル２の説明文です",
        hedingtext3: "サンプル３の説明文です",
      },
      {
        coverImage: "./assets/img/phone-cover.jpg",
        name: "Phone Standard",
        price: 299,
        description: "説明を書きます",
        heding1: "サンプル１です",
        heding2: "サンプル２です",
        heding3: "サンプル３です",
        hedingtext1: "サンプル１の説明文です",
        hedingtext2: "サンプル２の説明文です",
        hedingtext3: "サンプル３の説明文です",
      },
      {
        coverImage: "./assets/img/phone-cover.jpg",
        name: "Phone Standard",
        price: 999,
        description: "",
        heding1: "サンプル１です",
        heding2: "サンプル２です",
        heding3: "サンプル３です",
        hedingtext1: "サンプル１の説明文です",
        hedingtext2: "サンプル２の説明文です",
        hedingtext3: "サンプル３の説明文です",
      },
    ];
  }

  //初期化するメソッド
  // 処理：①cleanDbで初期化
  // 処理：②DB内にModelよりドキュメントをSaveする
  async initDb() {
    await this.cleanDb();
    this.pushProductsToDb();
  }
  //await asyncでDB削除（初期化）をする。deleteMany関数はTruncateのようなもの。awaitがある関数にはasyncを定義する。
  async cleanDb() {
    await Product.deleteMany({});
  }

  //上記のproductsを１つずつNewProductに入れてSaveする
  pushProductsToDb() {
    this.products.forEach((product) => {
      const newProduct = new Product(product);
      newProduct.save();
    });
  }
  seeDb() {
    this.pushProductsToDb();
  }
}

module.exports = FakeDb;

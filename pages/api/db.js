import mongodb from "@/utils/mongodb"
import jsondb from "@/jsondb/product";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await mongodb.dbConnect();

  await Product.deleteMany();
  await Product.insertMany(jsondb.products);

  let products = await Product.find({});

  await mongodb.dbDisconnect();
  // res.send({ text: 'Daten gespeichert.' })
  res.send({products})
}

import product from "../../../models/Product";
import db from "../../../utils/db";
import Product from "../../../models/Product";

export default async function get(req, res) {
    await db.connect();
    const product = await Product.find({});
    await db.connect();
    res.status(200).send(product);
}
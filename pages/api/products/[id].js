import db from "../../../utils/db";
import Product from "../../../models/Product";

export default async function get(req, res) {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.connect();
    res.status(200).send(product);
}
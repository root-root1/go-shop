import db from "../../utils/db";
import Product from "../../models/Product";
import data from "../../utils/data";
import User from "../../models/User";

export default async function get(req, res) {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.connect();
    res.status(200).send({message: "Seeded Successfully"});
}

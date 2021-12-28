import db from "../../../utils/db";
import User from "../../../models/User";

export default async function get(req, res) {
    await db.connect();
    const product = await User.find({});
    await db.connect();
    res.status(200).send(product);
}
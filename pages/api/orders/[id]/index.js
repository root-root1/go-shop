import Order from "../../../../models/Order";
import db from '../../../../utils/db';
import {isAuth} from "../../../../utils/auth";
import nc from "next-connect";

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) =>  {
    await db.connect();
    const order = await Order.findById(req.query.id);
    await db.connect();
    res.status(200).send(order);
})

export default handler;
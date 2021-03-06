import Order from "../../../models/Order";
import db from "../../../utils/db";
import nc from 'next-connect';
import {onError} from "../../../utils/error";
import {isAuth} from "../../../utils/auth";

const handler = nc({
    onError
});

handler.use(isAuth);

export default handler.post(async (req, res) => {
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: req.user._id
    });
    const order = await newOrder.save();
    await db.disconnect()
    res.status(201).send(order);
})

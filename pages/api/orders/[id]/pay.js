// import Order from "../../../../models/Order";
// import db from '../../../../utils/db';
// import {isAuth} from "../../../../utils/auth";
// import {onError} from "../../../../utils/error";
// import nc from "next-connect";
//
// const handler = nc({
//     onError
// });
//
// handler.use(isAuth);
// handler.get(async (req, res) =>  {
//     await db.connect();
//     const order = await Order.findById(req.query.id);
//     if (order){
//         order.isPaid = true;
//         order.paidAt = Date.now();
//         order.paymentResult = {
//             id: req.body.id,
//             status: req.body.status,
//             email_address: req.body.email_address
//         }
//         const paidOrder = await order.save();
//         await db.connect();
//         res.status(200).send({message: "Order Paid", order: paidOrder});
//     }else{
//         await db.connect();
//         res.status(404).send({message: "Order Not Found"})
//     }
// })
//
// export default handler;


import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
import onError from '../../../../utils/error';
import { isAuth } from '../../../../utils/auth';

const handler = nc({
    onError,
});
handler.use(isAuth);
handler.put(async (req, res) => {
    await db.connect();
    const order = await Order.findById(req.query.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.email_address,
        };
        const paidOrder = await order.save();
        await db.disconnect();
        res.send({ message: 'order paid', order: paidOrder });
    } else {
        await db.disconnect();
        res.status(404).send({ message: 'order not found' });
    }
});

export default handler;


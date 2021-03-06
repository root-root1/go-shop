import nc from "next-connect";
import {isAuth} from "../../../utils/auth";

const handler = nc();

handler.use(isAuth);
handler.get((req, res)=>{
    res.status(200).send(process.env.PAYPAL_CLIENT_ID || "sb");
});

export default handler;

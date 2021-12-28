import db from "../../../utils/db";
import User from "../../../models/User";
import {signToken} from "../../../utils/auth";
import bcrypt from "bcryptjs";


export default async function get(req, res) {
    if (req.method === "POST") {
        await db.connect();
        const newUser = User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            isAdmin: false
        });
        const user = await newUser.save();
        await db.disconnect();
        const token = signToken(user);
        // console.log(user);
        res.status(200).send({
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }
}
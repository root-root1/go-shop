import db from "../../../utils/db";
import users from "../../../models/User";
import {signToken} from "../../../utils/auth";
import bcrypt from "bcryptjs";


export default async function get(req, res) {
    if (req.method === "POST") {
        await db.connect();
        const user = await users.findOne({email: req.body.email});
        await db.disconnect();
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = signToken(user);
            res.status(200).send({
                token,
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            });
        } else {
            res.status(401).send({message: "Invalid Email or password"})
        }
    }
}
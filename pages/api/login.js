import { serialize } from "cookie";



export default async function handler(req, res) {
    if (req.method === "POST") {
        const {user, password} = req.body;

        if (user === process.env.ADMIN_BENUTZER && password === process.env.ADMIN_PASSWORD) {
            res.setHeader("Set-Cookie", serialize("token", process.env.TOKEN, {
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/"
            }));

            res.status(200).json("Erfolgreich")
        } else {
            res.status(400).json("Fehlgeschlagen")
        }
    }
}
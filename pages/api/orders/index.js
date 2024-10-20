import mongodb from "@/utils/mongodb";
import Order from "@/models/Order";


export default async function handler(req, res) {
    const { method } = req;
    await mongodb.dbConnect();

    switch (method) {
        case "GET":
            try {
                const orders = await Order.find()
                res.status(200).json(orders)
            }
            catch (error) {
                res.status(500).json(error)
            }
            break;
        case "POST":
            try {
                console.log("TEST")
                console.log(req.body)
                const order = await Order.create(req.body)
                res.status(201).json(order)
            }
            catch (error) {
                res.status(500).json(error)
            }
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
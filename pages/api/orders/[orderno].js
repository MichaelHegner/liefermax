import mongodb from "@/utils/mongodb";
import Order from "@/models/Order";


export default async function handler(req, res) {
    const { method, query: {orderno} } = req;
    await mongodb.dbConnect();

    switch (method) {
        case "GET":
            try {
                const order = await Order.findById(orderno)
                res.status(200).json(order)
            }
            catch (error) {
                res.status(200).json(error)
            }
            break;
        case "PUT":
            try {
                const order = await Order.findByIdAndUpdate(orderno, req.body, {new:true})
                res.status(200).json(order)
            }
            catch (error) {
                res.status(500).json(error)
            }
            break;
        case "DELETE":
            try {
                const order = await Order.findByIdAndDelete(orderno)
                res.status(200).json(order)
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
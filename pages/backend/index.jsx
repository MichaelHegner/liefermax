import {Table, Button, CloseButton} from "react-bootstrap"
import {useRouter} from "next/router"
import axios from "axios";
import Link from "next/link";


export default function Order({orders}) {
    const router = useRouter();
    const status = ["Eingegangen", "Zubereitung", "Unterwegs", "Ausgeliefert"];

    const statusUpdate = async(id, status) => {
        try {
            if (status <= 2) {
                await axios.put(`http://localhost:3000/api/orders/${id}`, {status: status + 1});
                router.reload();
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    const deleteOrder = async(id) =>  {
        try {
            await axios.delete(`http://localhost:3000/api/orders/${id}`);
            router.reload();
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <h1>Admin Backend</h1>

            <div className="row mt4">
                <div className="col-12">
                    <Table hover="responsive">
                        <thead>
                            <tr>
                                <th>Bestellnummer</th>
                                <th>Kunde</th>
                                <th>Adresse</th>
                                <th>Status</th>
                                <th><CloseButton disabled="true"/></th>
                            </tr>
                        </thead>

                        {orders.map((order) => (
                            <tbody key={order._id}>
                                <tr>
                                    <td>
                                        <Link className="danger" href={`/orders/${order._id}`}>
                                            {order._id}
                                        </Link>
                                    </td>
                                    <td>
                                        {order.customer}
                                    </td>
                                    <td>
                                        {order.address}
                                    </td>
                                    <td>
                                        <Button onClick={() => statusUpdate(order._id, order.status)}>{status[order.status]}</Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => deleteOrder(order._id)}>x</Button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const myCookie = ctx.req?.cookies || "";
    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/backend/login",
                permanent: false
            }
        }
    }


    const res = await axios.get(`http://localhost:3000/api/orders`);
    return {
        props: {orders: res.data}
    }
}

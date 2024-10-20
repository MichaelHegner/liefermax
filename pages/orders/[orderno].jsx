import { Table, Spinner, Button, Card } from "react-bootstrap"
import { useRouter } from "next/router"
import axios from "axios";


export default function Order({order}) {
    const router = useRouter();
    const { orderno } = router.query;

    let status;

    switch (order.status) {
        case 0:
            status = "Eingegangen";
            break;
        case 1:
            status = "Zubereitung";
            break;
        case 2:
            status = "Unterwegs";
            break;
        case 3:
            status = "Ausgeliefert";
            break;
    }

    if (orderno !== order._id) {
        return (
            <div>
                <h2>Bestellnummer {orderno} nicht vorhanden</h2>
                <Button variant='primary' onClick={() => router.push("/")}>
                    Zur Karte
                </Button>
            </div>
        )
    }

    return (
        <div>
            <h1>Bestellstatus</h1>

            <div className="row mt4">
                <div className="col-9">
                    <Table hover="responsive">
                        <thead>
                            <tr>
                                <th>Bestellnummer</th>
                                <th>Kunde</th>
                                <th>Adresse</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {orderno}
                                </td>
                                <td>
                                    {order.customer}
                                </td>
                                <td>
                                    {order.address}
                                </td>
                                <td>
                                    <span>{status}</span>
                                    {order.status < 3
                                        ? <Spinner animation="border" variant="success" size="sm" />
                                        : <span>✔️</span>
                                    }
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                    <Table hover="responsive">
                        <thead>
                            <tr>
                                <th>Produktname</th>
                                <th>Extras</th>
                                <th>Menge</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.products.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            {product.name}
                                        </td>
                                        <td>
                                            {product.extras.map((extra) => (
                                                <span key={extra._id}>{extra}</span>
                                            ))}
                                        </td>
                                        <td>
                                            {product.amount}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 p-2">
                    <div className="shadow">
                        <Card>
                            <Card.Header as="h5">Gesamt</Card.Header>
                            <Card.Body className="text-center">
                                <Card.Title>
                                    {order.amount.toFixed(2)} €
                                </Card.Title>
                                {order.payment === 0
                                    ? <Button variant="danger disabled">offen</Button>
                                    : <Button variant="success disabled">bezahlt</Button>
                                }
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({params}) {
    const res = await axios.get(`http://localhost:3000/api/orders/${params.orderno}`);
    return {
        props: {order: res.data}
    }
}
  
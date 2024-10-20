import { Table, CloseButton, Button, Card } from "react-bootstrap"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link";
import {clear, removeProduct} from "@/redux/basketSlice";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import { motion } from 'framer-motion';

export default function Basket() {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basket);
    const clientID = "AW9lPoH3qytD8PVYQOD12U_toMahsKtzGGvcwIiJ3jgnTxmzEB-QaXOd4XgC6MA4vM5yUUHQrt5JUAuZ";
    const [cashier, setCashier] = useState(false);
    const router = useRouter();

    const remove = (product) => {
        dispatch(removeProduct(product))
        toast.error(product.name + " wurde entfernt", {
            position: "top-center",
            autoClose: 3000
        });
    }

    const currency = "EUR";
    const amount = basket.total.toFixed(2);
    const style = {
        "layout":"vertical",
        "height": 30,
    };

    const createAnOrder = async (data) => {
        console.log(data);
        try {
            const res = await axios.post("http://localhost:3000/api/orders", data)
            if (res.status === 201) {
                dispatch(clear())
                router.push("/orders/" + res.data._id)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    function createOrder(data, actions) {
        return actions.order.create(
            {
                purchase_units: [
                    {
                        amount: {
                            currency_code: currency,
                            value: amount,
                        },
                    },
                ],
            }
        ).then((orderId) => {
            return orderId
        });
    }
    function onApprove(data, actions) {
        return actions.order.capture().then(function (details) {
            const customer = details.purchase_units[0].shipping;
            createAnOrder({
                customer: customer.name.full_name,
                address: customer.address.address_line_1 + " " + customer.address.admin_area_1,
                amount: amount,
                status: 0,
                payment: 1,
                products: basket.products.map((product) => (
                    {
                        name: product.name,
                        amount: product.amount,
                        extras: product.extras.map(extra => (extra.text))
                    }
                ))
            })
        });
    }

    const ButtonWrapper = ({ showSpinner }) => {
        const [{ isPending }] = usePayPalScriptReducer();

        return (
            <>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[style]}
                    fundingSource={undefined}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </>
        );
    }

    return (
        <motion.div
            initial={{y: -300}}
            animate={{y: 0}}
            transition={{type: 'spring', stiffness: 120}}>

            {
                basket.numberOfProducts === 0 ? (
                    <h2>Der Warenkorb ist leer!</h2>
                ) : (
                    <div>
                        <h1>Warenkorb</h1>

                        <div className="row mt4">
                            <div className="col-9">
                                <Table hover="responsive">
                                    <thead>
                                        <tr>
                                            <th>Bild</th>
                                            <th>Name</th>
                                            <th>Extras</th>
                                            <th>Menge</th>
                                            <th>Betrag</th>
                                            <th><CloseButton disabled /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            basket.products.map((product) => 
                                                <tr key={product._id}>
                                                    <td>
                                                        <Image src={product.pic} alt={product.name} width={50} height={50}></Image>
                                                    </td>
                                                    <td>
                                                        <Link href={`/products/${product.url}`} className="text-danger">
                                                            {product.name}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {product.extras.map(extra => (
                                                            <span key={extra._id}>{extra.text} </span>
                                                        ))} 
                                                    </td>
                                                    <td>
                                                        {product.amount}
                                                    </td>
                                                    <td>
                                                        {(product.price * product.amount).toFixed(2)}€
                                                    </td>
                                                    <td>
                                                        <Button className="btn-sm" onClick={() => remove(product)}>x</Button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-3 p-2">
                                <div className="shadow">
                                    <Card>
                                        <Card.Header as ="h5">Gesamt</Card.Header>
                                        <Card.Body className="text-center">
                                            <Card.Title>
                                                {amount} €
                                            </Card.Title>
                                            {
                                                cashier ? (
                                                    <PayPalScriptProvider options={{
                                                        clientId: clientID,
                                                        components: "buttons",
                                                        currency: "EUR"
                                                    }}>
                                                        <ButtonWrapper />
                                                    </PayPalScriptProvider>
                                                ) : <Button variant="primary" onClick={() => setCashier(true)}>Zur Kasse</Button>
                                            }
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>                    
                )
            }

        </motion.div>
    )
}
  
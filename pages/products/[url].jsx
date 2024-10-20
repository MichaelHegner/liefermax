import Link from 'next/link';
import Image from 'next/image';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import mongodb from '@/utils/mongodb';
import Product from '@/models/Product';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/basketSlice';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function ProductDetail({product}) {

    const [price, setPrice] = useState(product.price);
    const [extras, setExtras] = useState([]);
    const [amount, setAmount] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();


    const addExtra = (e, extra) => {
        const checked = e.target.checked;
        if (checked) {
            setPrice(price  + extra.price);
            setExtras([...extras, extra])
        } else {
            setPrice(price - extra.price);
            setExtras(extras.filter((allExtras) => allExtras._id !== extra.id))
        }
    }

    const toBasket = () => {
        const _id = uuidv4();
        dispatch(addProduct({...product, extras, price, amount, _id}))
        router.push("/basket");
    }

    if (!product) {
        return (
            <div>
                <h2>
                    Produkt nicht vorhanden.
                </h2>
            </div>
        );
    } else {
        return (
            <motion.div
                initial={{y: -300}}
                animate={{y: 0}}
                transition={{type: 'spring', stiffness: 120}}
            >
                <div>
                    <Link href="/" className="text-dark">
                        ⬅️ zurück zur Übersicht
                    </Link>
                </div>

                <div className="row row-cols-2 mt-2">
                    <div>
                        <Image className="rounded-3" src={product.pic} alt={product.name} width={600} height={600}
                               layout="responsive"></Image>
                    </div>

                    <div>
                        <h1>
                            {product.category}
                        </h1>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2 className="text-danger">{price.toFixed(2)} €</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                {product.description}
                            </ListGroupItem>
                            <ListGroupItem>

                                {
                                    product.extras.length ? "Extras: " : <p></p>
                                }

                                {
                                    product.extras.map((extra) => (
                                        <span key={extra.name}>
                                            {extra.text}
                                            &nbsp;
                                            <input id={extra.text} className="form-check-input me-2" type="checkbox"
                                                   onChange={(e) => addExtra(e, extra)}/>
                                        </span>
                                    ))
                                }

                            </ListGroupItem>
                            <ListGroupItem>
                                <input className="form-control w-50" type="number" value={amount} min='1' max='100'
                                       onChange={(e) => setAmount(e.target.value)}/>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="row shadow">
                                    <Button variant="danger" onClick={toBasket}>zum Warenkorb</Button>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </div>

            </motion.div>
        )
    }
}

export async function getServerSideProps(context) {
    const url = context.params.url;  // URL comes from dynamic route => filename [url].jsx

    await mongodb.dbConnect();
    const product = await Product.findOne({url}).lean(); // lean => einfache Javascript Objecte, als komplexe Mongoose Objekte
  
    return {
      props: {
        product: JSON.parse(JSON.stringify(product))
      }
    }
  }

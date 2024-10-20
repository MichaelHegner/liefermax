import {Card, Button} from 'react-bootstrap'
import Link from 'next/link'

export default function ProductList({products}) {
  return (
    <div>
        <div className="row row-cols-3">
            {
                products?.map((p) => (
                    <div key="{product.name}" className="mt-3 col">
                        <Card>
                            <Link href={`/products/${p.url}`} passHref>
                                <Card.Img variant="top" src={p.pic}></Card.Img>
                            </Link>
                            <Card.Body>
                                <Card.Title>
                                    {p.name} {p.price.toFixed(2)} €
                                </Card.Title>
                                <Card.Text>
                                    {p.description}
                                </Card.Text>
                                <Link href={`/products/${p.url}`} passHref>
                                    <Button variant="danger">Bestellen</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            }
        </div>

        <br /><br />

    </div>
  )
}

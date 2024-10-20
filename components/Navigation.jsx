import Link from 'next/link'
import Image from 'next/image'
import {Badge} from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function Navigation() {
    const numberOfProducts = useSelector((state) => state.basket.numberOfProducts);

    return (
        <div className="shadow sticky-top p-2 mb-2 bg-danger">
            <div className="d-flex justify-content-between align-items-center">
                <Link href="/">
                    <Image src="/img/logo.png" alt="Logo" width={180} height={75}></Image>
                </Link>
                <Link href="/basket">
                    {
                        numberOfProducts > 0
                            ? (
                                <>
                                    <Image src="/img/warenkorb.png" alt="Warenkorb" width={30} height={30}></Image>
                                    <Badge pill bg="success" style={{position: "absolute", right: "25px", top: "25px"}}>{numberOfProducts}</Badge>
                                </>
                            )
                            : (
                                <Image src="/img/warenkorb.png" alt="Warenkorb" width={30} height={30}></Image>
                            )
                    }
                </Link>
            </div>
        </div>
    )
}
  
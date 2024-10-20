import {Carousel} from "react-bootstrap";
import Image from 'next/image'

export default function Slider() {
  return (
    <div>
        <Carousel controls={false} fade={true} interval={2000}>
            <Carousel.Item>
                <Image className="d-block w-100 rounded-3" src="/img/food/burger.jpg" alt="Burger" width={3000} height={500}></Image>
            </Carousel.Item>
            <Carousel.Item>
                <Image className="d-block w-100 rounded-3" src="/img/food/burrito.jpg" alt="Burrito" width={3000} height={500}></Image>
            </Carousel.Item>
            <Carousel.Item>
                <Image className="d-block w-100 rounded-3" src="/img/food/pizza.jpg" alt="Pizza" width={3000} height={500}></Image>
            </Carousel.Item>
        </Carousel>
    </div>
  )
}

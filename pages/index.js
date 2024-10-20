import Slider from '@/components/Slider'
import ProductList from '@/components/ProductList'
import mongodb from '@/utils/mongodb';
import Product from '@/models/Product';
import { motion } from 'framer-motion';

export default function Home({products}) {
  return (
    <motion.div
      initial={{opacity: 0, x:-50}}
      animate={{opacity: 1, x: 0}}
      // transition={{ease: 'easeOut', duration: 3}}
      transition={{type: 'spring', stiffness: 200}}
    >

        <Slider />
        <ProductList products={products} />
    </motion.div>
  )
}

export async function getServerSideProps() {
  await mongodb.dbConnect();
  const products = await Product.find({}).lean(); // lean => einfache Javascript Objecte, als komplexe Mongoose Objekte

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
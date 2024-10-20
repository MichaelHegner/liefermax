import Head from 'next/head'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Layout({children}) {
  return (
    <div>
        <Head>
            <title>Liefermax - Dein Lieferservice</title>
            <meta name="description" content="Generated by Michael Hegner" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navigation />

        <div className="container">
            {children}
        </div>
        
        <Footer />         
    </div>
  )
}

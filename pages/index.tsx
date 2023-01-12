import Head from 'next/head'
import App from './_app'

export default function Home() {
  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App/>
    </>
  )
}

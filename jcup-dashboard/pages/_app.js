import '@/styles/globals.css'
import Layout from '../Components/Layout';

function WebApp({ Component, pageProps }) {
  return (
    <Layout>
    <Component {...pageProps} />
    </Layout>
  )
}

export default WebApp;
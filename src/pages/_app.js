import ClientLayout from '@/components/ClientLayout'
import '@/styles/index.css'
import '@/styles/variables.css'
import '@/styles/reset.css'




export default function MyApp({ Component, pageProps }) {
  return (
    <ClientLayout>
      <Component {...pageProps} />
    </ClientLayout>
  )
}


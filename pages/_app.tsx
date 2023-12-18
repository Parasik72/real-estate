import '@/styles/globals.css'
import Layout from '@/common/components/layout.component'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import container from '@/common/container/container'
import { ReduxStore } from '@/common/store/redux.store'

export default function App({ Component, pageProps }: AppProps) {
  const store = container.resolve<ReduxStore>('reduxStore');
  return (
    <Provider store={store.store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

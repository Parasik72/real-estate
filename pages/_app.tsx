import '@/styles/globals.css'
import Layout from '@/common/components/layout.component'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import container from '@/common/container/container'
import { ReduxStore } from '@/common/store/redux.store'

const redux = container.resolve<ReduxStore>('reduxStore');

const app = function App ({ Component, pageProps }: AppProps) {
  return (
    <Provider store={redux.store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default redux.wrapper.withRedux(app);
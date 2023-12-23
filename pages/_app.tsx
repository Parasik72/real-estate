import '@/styles/globals.css'
import Layout from '@/common/components/layout.component'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import container from '@/common/container/container'
import { ReduxStore } from '@/common/store/redux.store'

const redux = container.resolve<ReduxStore>('reduxStore');

export default function App ({ Component, ...rest }: AppProps) {
  const { store, props } = redux.wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
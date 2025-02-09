import './shim'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import * as SplashScreen from 'expo-splash-screen'

import { useCachedResources } from './hooks/design/useCachedResources'
import { useNetwork } from './hooks/api/useNetwork'
import { initI18n } from './translations'
import { Main } from './screens/Main'

initI18n()

export default function App (): JSX.Element | null {
  return (
    <Provider store={store}>
      <WalletApp />
    </Provider>
  )
}

function WalletApp (): JSX.Element | null {
  const isLoaded = [
    useCachedResources(),
    useNetwork()
  ]

  /* eslint-disable @typescript-eslint/no-floating-promises */
  if (isLoaded.includes(false)) {
    SplashScreen.preventAutoHideAsync()
    return null
  } else {
    SplashScreen.hideAsync()
    return <Main />
  }
}

import React, { useEffect, useState } from 'react'
import tailwind from 'tailwind-rn'
import { Text, View } from '../../components'
import { usePlaygroundApiClient, usePlaygroundRpcClient } from '../../hooks/api/usePlaygroundClient'
import { useWalletAPI } from '../../hooks/wallet/WalletAPI'
import { WalletStatus } from '../../store/wallet'
import { PlaygroundAction } from '../Playground.Action'
import { PlaygroundStatus } from '../Playground.Status'

export function PlaygroundUTXO (): JSX.Element | null {
  const WalletAPI = useWalletAPI()
  const rpcClient = usePlaygroundRpcClient()
  const apiClient = usePlaygroundApiClient()
  const [status, setStatus] = useState<string>('loading')

  useEffect(() => {
    apiClient.playground.wallet().then(() => {
      setStatus('online')
    }).catch(() => {
      setStatus('error')
    })
  }, [])

  if (WalletAPI.getStatus() !== WalletStatus.LOADED_WALLET) {
    return null
  }

  const actions = status === 'online' ? (
    <PlaygroundAction
      testID='playground_wallet_top_up'
      title='Top up 50 DFI UTXO to Wallet'
      onPress={async () => {
        const address = await WalletAPI.getWallet().get(0).getAddress()
        await rpcClient.wallet.sendToAddress(address, 50)
      }}
    />
  ) : null

  return (
    <View>
      <View style={tailwind('flex-row flex items-center')}>
        <Text style={tailwind('text-2xl font-bold')}>UTXO</Text>
        <View style={tailwind('ml-2')}>
          <PlaygroundStatus
            online={status === 'online'}
            loading={status === 'loading'}
            error={status === 'error'}
          />
        </View>
      </View>

      {actions}
    </View>
  )
}

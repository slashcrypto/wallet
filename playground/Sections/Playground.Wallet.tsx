import React from 'react'
import { useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn'
import { Text, View } from '../../components'
import { useWalletAPI } from '../../hooks/wallet/WalletAPI'
import { WalletStatus } from '../../store/wallet'
import { PlaygroundAction } from '../Playground.Action'
import { PlaygroundStatus } from '../Playground.Status'

export function PlaygroundWallet (): JSX.Element | null {
  const WalletAPI = useWalletAPI()
  const status = WalletAPI.getStatus()
  const dispatch = useDispatch()

  return (
    <View>
      <View style={tailwind('flex-row flex items-center')}>
        <Text style={tailwind('text-2xl font-bold')}>Wallet</Text>
        <View style={tailwind('ml-2')}>
          <PlaygroundStatus
            online={status === WalletStatus.LOADED_WALLET}
            loading={status === WalletStatus.LOADING}
            offline={status === WalletStatus.NO_WALLET}
            error={status === WalletStatus.ERROR}
          />
        </View>
      </View>

      <PlaygroundAction
        testID='playground_wallet_clear'
        title='Clear stored mnemonic seed'
        onPress={() => WalletAPI.clearWallet(dispatch)}
      />

      <PlaygroundAction
        testID='playground_wallet_abandon'
        title='Setup wallet with abandon x23 + art as mnemonic seed'
        onPress={() => {
          WalletAPI.setMnemonicAbandon23(dispatch)
        }}
      />

      <PlaygroundAction
        testID='playground_wallet_random'
        title='Setup wallet with a randomly generated mnemonic seed'
        onPress={() => WalletAPI.randomMnemonic(dispatch)}
      />
    </View>
  )
}

import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import tailwind from 'tailwind-rn'
import { Text, View } from '../../../components'
import { PrimaryColor, VectorIcon, VectorIconName } from '../../../constants/Theme'
import { useWalletAPI } from '../../../hooks/wallet/WalletAPI'
import { translate } from '../../../translations'

export function WalletOnboarding (): JSX.Element {
  const WalletAPI = useWalletAPI()
  const dispatch = useDispatch()
  const navigator = useNavigation()

  function onDebugPress (): void {
    // TODO(fuxingloh): this should only be available in debug mode
    WalletAPI.setMnemonicAbandon23(dispatch)
  }

  return (
    <ScrollView style={tailwind('flex-1 py-8 bg-gray-100')} testID='wallet_onboarding'>
      <View style={tailwind('flex items-center')}>
        <TouchableOpacity delayLongPress={5000} onLongPress={onDebugPress}>
          <View style={tailwind('flex bg-white justify-center items-center rounded-full h-16 w-16')}>
            <VectorIcon size={26} name='account-balance-wallet' color='#999' />
          </View>
        </TouchableOpacity>

        <Text style={tailwind('font-bold text-lg mt-4 text-gray-600')}>
          {translate('screens/WalletOnboarding', 'No wallets')}
        </Text>
      </View>

      <View style={tailwind('mt-8')}>
        <WalletOptionRow
          onPress={() => navigator.navigate('WalletMnemonicCreate')}
          text='Create new mnemonic wallet' icon='account-balance-wallet'
        />
        <View style={tailwind('h-px bg-gray-100')} />
        <WalletOptionRow
          onPress={() => navigator.navigate('WalletMnemonicRestore')}
          text='Restore mnemonic wallet' icon='restore-page'
        />
      </View>
    </ScrollView>
  )
}

function WalletOptionRow (props: { text: string, icon: VectorIconName, onPress: () => void }): JSX.Element {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={tailwind('flex-row items-center justify-between px-4 bg-white')}
    >
      <View style={tailwind('flex-row items-center')}>
        <VectorIcon name={props.icon} size={24} color={PrimaryColor} />
        <Text style={tailwind('font-medium ml-3 py-4')}>
          {props.text}
        </Text>
      </View>
      <View>
        <VectorIcon name='chevron-right' size={24} />
      </View>
    </TouchableOpacity>
  )
}

import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { SectionList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tailwind from 'tailwind-rn'
import { Text, View } from '../../../../components'
import { PrimaryColor, PrimaryColorStyle, VectorIcon } from '../../../../constants/Theme'
import { useWalletAPI } from '../../../../hooks/wallet/WalletAPI'
import { RootState } from '../../../../store'
import { NetworkName } from '../../../../store/network'
import { translate } from '../../../../translations'
import { SettingsParamList } from './SettingsNavigator'

type Props = StackScreenProps<SettingsParamList, 'SettingsScreen'>

export function SettingsScreen ({ navigation }: Props): JSX.Element {
  const network = useSelector<RootState, NetworkName | undefined>(state => state.network.name)
  const WalletAPI = useWalletAPI()
  const dispatch = useDispatch()

  return (
    <View style={tailwind('flex-1 bg-gray-100')}>
      <SectionList
        sections={[
          {
            key: 'Network',
            data: [''],
            renderItem (): JSX.Element {
              return RowNetworkItem(network, () => navigation.navigate('Playground'))
            }
          },
          {
            data: ['EXIT WALLET'],
            renderItem (): JSX.Element {
              return RowExitWalletItem(() => WalletAPI.clearWallet(dispatch))
            }
          }
        ]}
        ItemSeparatorComponent={ItemSeparator}
        renderSectionHeader={({ section }) => {
          return SectionHeader(section.key)
        }}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  )
}

function ItemSeparator (): JSX.Element {
  return <View style={tailwind('h-px bg-gray-100')} />
}

function SectionHeader (key?: string): JSX.Element | null {
  if (key === undefined) {
    return <Text style={tailwind('h-6')} />
  }

  return (
    <Text style={tailwind('p-4 font-bold text-lg')}>
      {translate('wallet/settings', key)}
    </Text>
  )
}

function RowNetworkItem (network?: NetworkName, onPress?: () => void): JSX.Element {
  function getNetworkName (): string {
    switch (network) {
      case 'mainnet':
        return 'MainNet'
      case 'testnet':
        return 'TestNet'
      case 'regtest':
        return 'RegTest'
      case 'playground':
        return 'Playground'
      default:
        return 'Not Connected'
    }
  }

  return (
    <TouchableOpacity
      style={tailwind('flex-1 flex-row px-4 bg-white items-center justify-between')}
      onPress={onPress}
    >
      <Text style={tailwind('py-4')}>
        {getNetworkName()}
      </Text>
      <VectorIcon size={24} name='check' color={PrimaryColor} />
    </TouchableOpacity>
  )
}

function RowExitWalletItem (onPress: () => void): JSX.Element {
  return (
    <TouchableOpacity
      testID='setting_exit_wallet'
      onPress={onPress} style={tailwind('bg-white')}
    >
      <Text style={[tailwind('p-4 font-bold'), PrimaryColorStyle.text]}>
        {translate('wallet/settings', 'EXIT WALLET')}
      </Text>
    </TouchableOpacity>
  )
}

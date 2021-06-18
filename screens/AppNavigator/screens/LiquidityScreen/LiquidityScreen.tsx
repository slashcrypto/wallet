import { PoolPairData } from '@defichain/whale-api-client/dist/api/poolpair'
import { TokenData } from "@defichain/whale-api-client/dist/api/tokens";
import * as React from 'react'
import { useEffect, useState } from 'react'
import { SectionList } from 'react-native'
import tailwind from 'tailwind-rn'
import { Text, View } from '../../../../components'
import { useWhaleApiClient } from '../../../../hooks/api/useWhaleApiClient'
import { translate } from '../../../../translations'

export function LiquidityScreen (): JSX.Element {
  const whaleApiClient = useWhaleApiClient()
  const [status, setStatus] = useState<string>('loading')
  const [lpTokens, setLpTokens] = useState<DexItem<TokenData>[]>([]);
  const [pairs, setPairs] = useState<Array<DexItem<PoolPairData>>>([])

  useEffect(() => {
    whaleApiClient.poolpair.list(30).then(pairs => {
      const items: Array<DexItem<PoolPairData>> = [...pairs].map(data => ({ type: 'available', data: data }))
      setPairs(items)
    })
    setStatus('loaded')
  }, [status])

  /// TODO(fuxingloh): section header
  return (
    <SectionList
      style={tailwind('bg-gray-100')}
      sections={[
        // {
        //   data: lpTokens,
        //   renderItem (): JSX.Element {
        //
        //   }
        // },
        {
          key: 'Available pool pairs',
          data: pairs,
          renderItem: ({ item }) => PoolPairRow(item.data)
        }
      ]}
      ItemSeparatorComponent={() => <View style={tailwind('h-px bg-gray-100')} />}
      renderSectionHeader={({ section }) => {
        return (
          <Text style={tailwind('pt-5 pb-4 px-4 font-bold bg-gray-100')}>
            {translate('app/LiquidityScreen', section.key || '')}
          </Text>
        )
      }}
      keyExtractor={(item, index) => `${index}`}
    />
  )
}

interface DexItem<T> {
  type: 'your' | 'available'
  data: T
}

function PoolPairRow (data: PoolPairData): JSX.Element {
  return (
    <View style={tailwind('p-4 bg-white')}>
      <View>
        <Text>{data.symbol}</Text>
      </View>

      <View style={tailwind('flex-row justify-between mt-2')}>
        <Text style={tailwind('text-sm')}>APR</Text>
        <Text>105%</Text>
      </View>

      <View style={tailwind('flex-row justify-between')}>
        <Text style={tailwind('text-sm')}>Total liquidity</Text>
        <Text>{data.totalLiquidity}</Text>
      </View>
    </View>
  )
}

import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export function IconLTC (props: SvgProps): JSX.Element {
  return (
    <Svg width={32} height={32} viewBox='0 0 32 32' {...props}>
      <Path
        fill='#345D9D'
        d='M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c8.838 0 16-7.163 16-16S24.838 0 16 0z'
      />
      <Path
        fill='#FFF'
        d='M16.25 16.529l-1.656 5.618 8.888.003c.305 0 .525.29.441.583l-.765 2.67a.609.609 0 01-.586.441L8.973 25.84l2.298-7.769-2.544.789.544-1.847 2.546-.789 3.229-10.911a.61.61 0 01.586-.442l3.443.002c.305 0 .524.291.441.583l-2.718 9.222 2.544-.788-.545 1.847-2.547.792z'
      />
    </Svg>
  )
}

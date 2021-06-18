import * as React from 'react'
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg'

export function IconDFI (props: SvgProps): JSX.Element {
  return (
    <Svg
      height='32' width='32' viewBox='-2 0 29 26'
      {...props}
    >
      <G>
        <Circle fill='#FF00AF' cx={12} cy={12} r={12} />
        <Path
          d='M13.662 17.59V6.41A5.844 5.844 0 0117.83 12a5.844 5.844 0 01-4.167 5.59M11.996 4.5v6.321l-.952-.952-.122-2.376.993-2.989a7.464 7.464 0 00-1.84.254l-.48 1.444-1.363-.682a7.522 7.522 0 00-1.48 1.123l2.523 1.263.073 1.446-1.446-.074-1.264-2.521c-.433.443-.809.94-1.123 1.48L6.2 9.599l-1.446.48a7.484 7.484 0 00-.253 1.84l2.99-.993 2.375.121.953.953-.953.953-2.376.12-2.989-.992c.007.636.098 1.252.253 1.84l1.446.48-.684 1.362c.314.54.69 1.037 1.123 1.48l1.264-2.521 1.446-.074-.073 1.445-2.522 1.265c.442.433.94.808 1.48 1.122l1.361-.683.48 1.445a7.484 7.484 0 001.841.254l-.993-2.989.122-2.376.952-.952V19.5a7.5 7.5 0 000-15'
          fill='#FFF'
        />
      </G>
    </Svg>
  )
}

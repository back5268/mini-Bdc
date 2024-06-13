import React from 'react'
import { View } from 'react-native'

const Hrz = ({ className = "" }) => {
  return (
    <View className={`border-t-[1px] border-border ${className}`} />
  )
}

export default Hrz
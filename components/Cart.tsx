import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const Cart = () => {
    const totaItems = 10
  return (
   <TouchableOpacity className='cart-btn'>

    <Image source={images.bag} className="size-5" resizeMode="contain" />

    {totaItems > 0 && (
        <View className='cart-badge'>
            <Text className='small-bold text-white'>{totaItems}</Text>
        </View>
    )}
   </TouchableOpacity>
  )
}

export default Cart
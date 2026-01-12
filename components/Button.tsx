import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/type'
import cn from 'clsx';

export default function Button({ onPress, title = "Click Me", style, textStyle, leftIcon, isLoading = false}: CustomButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={isLoading} className={cn("custom-btn", style)}>
        {leftIcon}
     <View className="flex-center flex-row">
 {
    isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
    ) : (
        <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>{title}</Text>
    )
 }
     </View>
    </TouchableOpacity>
  )
}
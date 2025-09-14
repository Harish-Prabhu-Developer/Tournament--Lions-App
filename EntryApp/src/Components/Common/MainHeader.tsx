import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MainHeader = () => {
    const insets = useSafeAreaInsets();
  return (
      <LinearGradient
        colors={['#4f46e5', '#7c3aed']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 12,
          paddingBottom: '4%',
        }}
      >
        <View style={{ paddingInline: '4%' }}>
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>
            Welcome back,
          </Text>
          <Text style={{ color: 'white', fontWeight: '900', fontSize: 18 }}>
            {'John Doe'}
          </Text>
        </View>
      </LinearGradient>
  )
}

export default MainHeader
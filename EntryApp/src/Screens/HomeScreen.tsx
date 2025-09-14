import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainHeader from '../Components/Common/MainHeader';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-gray-50">
      {/* 🟣 Header */}
      <MainHeader/>
    </View>
  );
};

export default HomeScreen;

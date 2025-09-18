import { View, Text } from 'react-native';
import React, { useState } from 'react';
import MainHeader from '../Components/Common/MainHeader';

const TournamentScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };
  return (
    <View className='flex-1 bg-white'>
        {/* Header */}
        <MainHeader SearchBar={true} placeholdertext='Search Tournaments' onSearch={handleSearch}/>
    </View>
  );
};

export default TournamentScreen;

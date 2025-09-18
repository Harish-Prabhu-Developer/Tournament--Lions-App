import { View, Text } from 'react-native';
import React, { useState } from 'react';
import MyEntriesCard from '../Components/MyEntries/MyEntriesCard';
import MainHeader from '../Components/Common/MainHeader';
// 📝 Entry Screen (Bottom Nav #2)
// Step-by-Step Smart Form
// Like WhatsApp Status UI → Each page focuses on 1-2 fields.

// 1. Select Entry Type
//  Single Entry

//  Doubles Entry

// 2. Select Category
//  Boys / Girls / Mixed

//  Singles / Doubles

//  Age Group (dropdown or horizontal scroll)

// 3. Fill Player Details
// 🧍 Single Entry Form:
// Name

// Date of Birth (DOB Picker)

// Academy Name

// Place

// TNBA ID

// 👥 Doubles Entry Form:
// Your Details (same as above)

// Partner Details (same fields)

// 4. Upload Proofs (if needed)
// Address proof (optional)

// Age proof (optional)

// 5. Review & Pay
// Summary of entry

// Total Fee (e.g., Singles ₹700, Doubles ₹1300)

// UPI / Razorpay / Netbanking
const MyEntriesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
    // Later → filter entries list using query
  };
  return (
    <View className="flex-1 bg-white">
      <MainHeader SearchBar={true}  placeholdertext='Search Entries' onSearch={handleSearch}/>
    </View>
  );
};

export default MyEntriesScreen;

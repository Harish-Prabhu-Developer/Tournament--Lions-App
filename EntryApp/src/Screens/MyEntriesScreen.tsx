import { View, Text } from 'react-native';
import React from 'react';
import MyEntriesCard from '../Components/MyEntries/MyEntriesCard';
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
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl'>MyEntriesScreen</Text>
      <MyEntriesCard
  category="Boys"
  type="Doubles"
  ageGroup="U15"
  name="Harish Prabhu"
  dob="02-04-2011"
  academy="Smash Point"
  place="Sivakasi"
  tnbaId="TNB123456"
  partnerName="Raj K"
  partnerDob="04-05-2011"
  partnerId="TNB654321"
  status="Cancelled"
  entryId="ENT0012"
  submittedDate="30-Jan-2025"
  onView={() => console.log("View entry")}
  onEdit={() => console.log("Edit entry")}
  onDelete={() => console.log("Delete entry")}
  onPayNow={() => console.log("Pay Now")}
/>

    </View>
  );
};

export default MyEntriesScreen;

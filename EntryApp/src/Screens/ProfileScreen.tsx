import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/Store';
import { logout } from '../Redux/Slice/authSlice';

// 👤 Profile Screen (Bottom Nav #3)
// View / Edit profile

// My Entries (list of events you've entered)

// Status: Accepted / Pending / Paid

// Contact Support (call, WhatsApp, email options)

// 🏠 Home Screen (Bottom Nav #1)
// Tabs:

// News & Announcements

// Latest updates (Last Date, Match Days, etc.)

// Categories

// 1.Boys / Girls / Mixed

// 2.Singles / Doubles

// 3.Age Groups: U9, U11, U13, U15, U17, U19

// View Matches / Schedule (post-deadline)
const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Button title='Logout' onPress={()=>dispatch(logout())} />
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

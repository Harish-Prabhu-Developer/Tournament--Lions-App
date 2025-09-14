import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import MyEntriesScreen from "../Screens/MyEntriesScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import MyTabBar from "./MyTabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type RootTabBarParamList = {
  Home: undefined;
  MyEntries: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabBarParamList>();

const BottomTab = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
      
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="MyEntries" component={MyEntriesScreen} options={{ tabBarLabel: "My Entries" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "Profile" }} />
    </Tab.Navigator>
  );
};

export default BottomTab;

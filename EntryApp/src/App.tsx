import React from 'react';
import '../global.css'; // Ensure global styles are imported
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import BottomTab from './Navigation/BottomTab';

type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
          <Stack.Screen name='Tabs' component={BottomTab} />

        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

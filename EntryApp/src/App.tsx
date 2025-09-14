import React, { useEffect, useState } from 'react';
import '../global.css'; // Ensure global styles are imported
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import BottomTab from './Navigation/BottomTab';
import SplashScreen from './Screens/SplashScreen';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false, animation: 'fade' }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Tabs" component={BottomTab} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import "../global.css";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Store from "./Redux/Store";
import LoginScreen from "./Screens/LoginScreen";
import BottomTab from "./Navigation/BottomTab";
import SplashScreen from "./Screens/SplashScreen";
import { ToastProvider, useToast } from "./Components/Common/CustomToast";
import NoInternet from "./Screens/NoInternet";

export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// ✅ Inner component that has access to Toast
const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [networkStrength, setNetworkStrength] = useState("Unknown");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  const { showToast } = useToast();

  // Detect network status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(!!state.isConnected);

      if (state.type === "wifi" && state.details?.strength) {
        const level = state.details.strength; // 0–100
        if (level > 75) setNetworkStrength("High");
        else if (level > 40) setNetworkStrength("Medium");
        else setNetworkStrength("Low");
      } else if (state.type === "cellular" && state.details?.cellularGeneration) {
        switch (state.details.cellularGeneration) {
          case "5g":
          case "4g":
            setNetworkStrength("High");
            break;
          case "3g":
            setNetworkStrength("Medium");
            break;
          case "2g":
          default:
            setNetworkStrength("Low");
        }
      } else {
        setNetworkStrength("Unknown");
      }
    });

    return () => unsubscribe();
  }, []);

  // Splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        console.log("isLoggedIn from AsyncStorage:", loggedIn);
        setIsLoggedIn(loggedIn === "true");
      } catch (error) {
        console.error("Error checking login status", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  // Show toast for poor connection
  useEffect(() => {
    if (networkStrength === "Low") {
      showToast("⚠️ Internet connection is weak", "warning" );
    }
  }, [networkStrength, showToast]);

  if (isLoggedIn === null) {
    // return a loader if you want
    return null;
  }

  return (
    <NavigationContainer>
      {!isConnected ? (
        <NoInternet
          onRetry={() =>
            NetInfo.fetch().then((s) => setIsConnected(!!s.isConnected))
          }
        />
      ) : showSplash ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "Tabs" : "Login"}
          screenOptions={{ headerShown: false, animation: "fade" }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Tabs" component={BottomTab} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

// ✅ Wrap AppContent with Provider + ToastProvider
const App = () => (
  <Provider store={Store}>
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  </Provider>
);

export default App;

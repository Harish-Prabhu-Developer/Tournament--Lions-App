import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Text,
  Keyboard,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import BadmintonSVG from '../assets/Badminton-bro.svg';
import CustomTextInput from '../Components/Input/CustomTextInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/Store';
import { login } from '../Redux/Slice/authSlice';

const LoginScreen = () => {
   const [loginId, setLoginId] = useState(''); 
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const {loading,error} =useSelector((state:RootState)=>state.auth)
    const [isLoading, setIsLoading] = useState(loading);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedLoginId = await AsyncStorage.getItem('rememberedLoginId');
        const savedPassword = await AsyncStorage.getItem('rememberedPassword');

        if (savedLoginId && savedPassword) {
          setLoginId(savedLoginId);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Error loading saved credentials', error);
      }
    };

    loadSavedCredentials();
  }, []);
  const handleLogin = async () => {
    setIsLoading(true);
      // Decide if input is phone or email
    let credentials: any = { password };
    if (/^\d{10}$/.test(loginId)) {
      credentials.phone = loginId;
    } else if (/\S+@\S+\.\S+/.test(loginId)) {
      credentials.email = loginId;
    } else {
      setErrorMessage('Please enter a valid email or phone number.');
      setIsLoading(false);
      return;
    }
  console.log('Logging in with', credentials);

  try {
    const res = await dispatch(login(credentials)).unwrap();
    console.log('Login Response : ', res);

    if (res.success) {
      
      setErrorMessage('');

      // Optional delay before navigating (e.g., to show loader)
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('Tabs');
      }, 500); // 500ms delay, adjust as needed
    } else {
      // unwrap normally throws on reject, so this is defensive
      setErrorMessage(res.message || 'Login failed');
    }
    setIsLoading(false);
  } catch (err: any) {
    const message =
      err?.message || err?.msg || (typeof err === 'string' ? err : 'Login failed');
      setIsLoading(false);
    setErrorMessage(message);
  }

  // Handle remember me
  try {
    if (rememberMe) {
      await AsyncStorage.setItem('rememberedLoginId', loginId);
      await AsyncStorage.setItem('rememberedPassword', password);
    } else {
      await AsyncStorage.removeItem('rememberedLoginId');
      await AsyncStorage.removeItem('rememberedPassword');
    }
  } catch (error: any) {
    console.error('Error saving credentials', error.message);
  }
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, padding: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Illustration */}
          <Pressable
            onPress={() => Keyboard.dismiss()}
            className="items-center mb-8"
          >
            <View className="w-full h-[260px] rounded-3xl bg-indigo-50 items-center justify-center shadow-md">
              <BadmintonSVG width="100%" height={260} />
            </View>
          </Pressable>

          {/* Title */}
          <View style={{ marginBottom: 32 }}>
            <Text
              className="text-3xl font-bold text-center mb-2"
              style={{ color: '#111827' }}
            >
              Welcome Back 👋
            </Text>
            <Text className="text-center text-gray-600 text-base">
              Sign in to access your tournament dashboard
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 24 }}>
            <View>
              <Text
                style={{
                  color: '#374151',
                  fontWeight: '600',
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                Email or Phone
              </Text>
                <CustomTextInput
                  type={loginId && /^\d{10}$/.test(loginId) ? 'phone' : 'email'} // set type email or phone based on loginId
                  placeholder="Email or phone"
                  value={loginId}
                  onChangeText={setLoginId}
                  error={
                    loginId &&
                    !(/^\d{10}$/.test(loginId) || /\S+@\S+\.\S+/.test(loginId))
                      ? 'Please enter a valid email or phone number.'
                      : ''
                  }
                />

            </View>

            <View>
              <Text
                style={{
                  color: '#374151',
                  fontWeight: '600',
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                Password
              </Text>
              <CustomTextInput
                type="password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                error={
                  password && password.length < 6
                    ? 'Password must be at least 6 characters.'
                    : ''
                }
              />
            </View>
            {/* Remember Me */}
            <View className="flex-row justify-between items-center w-full px-2">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setRememberMe(!rememberMe)}
              >
                <FontAwesome
                  name={rememberMe ? 'check-square' : 'square-o'}
                  size={20}
                  color="#4f46e5"
                />
                <Text className="ml-2 font-semibold text-md text-indigo-700">
                  Remember me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text className="text-right underline text-md text-indigo-700 font-semibold">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            {/* Error Message */}
            {errorMessage && (
              <Text className="text-red-600 text-center font-bold text-lg">
                {errorMessage}
              </Text>
            )}
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.85}>
              <LinearGradient
                colors={['#4f46e5', '#7c3aed']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 16,
                  shadowColor: '#4f46e5',
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  elevation: 5,
                }}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color="#fff"
                    size={'small'}
                    style={{ paddingVertical: 16 }}
                  />
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      paddingVertical: 16,
                      fontSize: 18,
                      fontWeight: '600',
                      letterSpacing: 0.5,
                    }}
                  >
                    Login
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Spacer */}
          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

// CommonFunctions.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  dob: string;
  gender: string;
  profile_image: string;
};

// ✅ Decode JWT safely
function DecodeJWT<T = any>(token: string): T | null {
  try {
    return jwtDecode<T>(token);
  } catch (error) {
    console.error("❌ Invalid JWT:", error);
    return null;
  }
}

// ✅ Get user data from stored token
export async function GetUsersData(): Promise<User | null> {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      console.warn("⚠️ No token found in storage");
      return null;
    }

    const user = DecodeJWT<User>(token);

    if (!user) {
      console.warn("⚠️ Failed to decode user from token");
      return null;
    }

    return user;
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
    return null;
  }
}

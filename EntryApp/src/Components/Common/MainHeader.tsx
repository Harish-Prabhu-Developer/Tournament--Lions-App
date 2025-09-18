import { View, Text, Image, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GetUsersData, User } from "../../Utils/CommonFunctions";

type MainHeaderProps = {
  onNotificationsPress?: () => void;
  notificationsCount?: number;
  SearchBar?: boolean;
  onSearch?: (text: string) => void;
  placeholdertext?: string;
};

const MainHeader: React.FC<MainHeaderProps> = ({
  onNotificationsPress,
  notificationsCount = 0,
  onSearch,
  SearchBar = false,
  placeholdertext = "Search",
}) => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<User | null>(null);

  // ✅ Load user once
  useEffect(() => {
    const fetchUser = async () => {
      const u = await GetUsersData();
      setUser(u);
    };
    fetchUser();
  }, []);

  // Greeting logic
  const hours = new Date().getHours();
  let greeting = "Welcome";
  if (hours < 12) greeting = "Good Morning";
  else if (hours < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <LinearGradient
      colors={["#1e3a8a", "#4338ca", "#7c3aed"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingTop: insets.top + 12,
        paddingBottom: 16,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      {/* Top Section for Greeting + Notifications */}
      <View className="flex-row items-center w-full justify-between">
        {/* Left Section - Greeting + User */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Profile Avatar */}
          {user?.profile_image ? (
            <Image
              source={{ uri: user.profile_image }}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                borderWidth: 2,
                borderColor: "#fff",
                marginRight: 10,
              }}
            />
          ) : (
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: "#6366f1",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </Text>
            </View>
          )}

          <View>
            <Text style={{ color: "#FFD700", fontSize: 14, fontWeight: "500" }}>
              {greeting} 👋
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              {user?.name ?? "User"}
            </Text>
          </View>
        </View>

        {/* Right Section - Notifications */}
        <Pressable
          onPress={onNotificationsPress}
          style={{ position: "relative", padding: 6 }}
        >
          <Icon name="notifications-none" size={28} color="#fff" />
          {notificationsCount > 0 && (
            <View
              style={{
                position: "absolute",
                right: 4,
                top: 2,
                backgroundColor: "#ef4444",
                borderRadius: 10,
                minWidth: 18,
                height: 18,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 4,
                borderWidth: 1,
                borderColor: "#fff",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                {notificationsCount}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* 🔎 Modern Search Bar */}
      {SearchBar && (
        <View className="w-full px-4 mt-6">
          <View className="flex-row items-center bg-white rounded-lg px-4 py-1">
            <Icon name="search" size={26} color="#6b7280" />
            <TextInput
              placeholder={placeholdertext}
              placeholderTextColor="#9ca3af"
              className="flex-1 ml-2 text-purple-900 text-lg font-semibold"
              onChangeText={onSearch}
            />
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

export default MainHeader;

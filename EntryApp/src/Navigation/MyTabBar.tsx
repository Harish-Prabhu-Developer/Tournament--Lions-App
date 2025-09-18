// MyTabBar.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ✅ Import Reanimated
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const MyTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const getIcon = (routeName: string) => {
    switch (routeName) {
      case "Home":
        return "home";
      case "Tournaments":
        return "emoji-events"; // 🏆
      case "MyEntries":
        return "list-alt";
      case "Profile":
        return "person";
      default:
        return "circle";
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 60 + insets.bottom,
      }}
    >
      <LinearGradient
        colors={["#4f46e5", "#7c3aed"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingBottom: insets.bottom + 6,
          paddingTop: "2%",
          elevation: 6,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          overflow: "hidden",
        }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const iconName = getIcon(route.name);
          const label =
            descriptors[route.key].options.tabBarLabel ?? route.name;

          // ✅ Shared value for scale
          const scale = useSharedValue(isFocused ? 1.2 : 1);

          // Update scale when focus changes
          scale.value = withSpring(isFocused ? 1.2 : 1, {
            damping: 12,
            stiffness: 120,
          });

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }],
          }));

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* ✅ Wrap icon in Animated.View */}
              <Animated.View style={animatedStyle}>
                <Icon
                  name={iconName}
                  size={isFocused?26:24}
                  color={isFocused ? "#FFD700" : "white"}
                />
              </Animated.View>

              {/* Label with fade animation */}
              <Animated.Text
                style={[
                  {
                    color: isFocused ? "#FFD700" : "white",
                    fontSize: isFocused ? 14 : 12,
                    marginTop: 2,
                    fontWeight: isFocused ? "700" : "500",
                  },
                  useAnimatedStyle(() => ({
                    opacity: withTiming(isFocused ? 1 : 0.6, { duration: 250 }),
                  })),
                ]}
                numberOfLines={1}
              >
                {label as string}
              </Animated.Text>
            </Pressable>
          );
        })}
      </LinearGradient>
    </View>
  );
};

export default MyTabBar;

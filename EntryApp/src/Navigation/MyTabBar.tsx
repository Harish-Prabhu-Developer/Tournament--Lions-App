import React from "react";
import { View, Text, Pressable } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MyTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const getIcon = (routeName: string) => {
    switch (routeName) {
      case "Home":
        return "home";
      case "MyEntries":
        return "list-alt";
      case "Profile":
        return "person";
      default:
        return "circle";
    }
  };
    const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        height: 60+insets.bottom,
      }}
    >
      <LinearGradient
        colors={['#4f46e5', '#7c3aed']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flexDirection: "row",
          borderRadius: 18,
          padding: 10,
          marginHorizontal: 16,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 12,
          elevation: 6,
          width: "92%",
        }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const iconName = getIcon(route.name);
          const label =
            descriptors[route.key].options.tabBarLabel ?? route.name;

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
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: isFocused ? "rgba(255,255,255,0.9)" : "transparent",
                flexDirection: "row",
                marginHorizontal: 6,
              }}
            >
              <Icon
                name={iconName}
                size={22}
                color={isFocused ? "#7c3aed" : "#fff"}
              />
              {isFocused && (
                <Text
                  style={{
                    color: "#7c3aed",
                    marginLeft: 8,
                    fontWeight: "600",
                    fontSize: 14,
                    textTransform: "capitalize",
                  }}
                >
                  {label as string}
                </Text>
              )}
            </Pressable>
          );
        })}
      </LinearGradient>
    </View>
  );
};

export default MyTabBar;

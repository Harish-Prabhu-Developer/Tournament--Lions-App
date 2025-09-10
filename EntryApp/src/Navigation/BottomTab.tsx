import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import MyEntriesScreen from "../Screens/MyEntriesScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabItem = {
  route: string;
  label: string;
  icon: string;
  component: React.ComponentType<any>;
};

const Tab = createBottomTabNavigator();

const TabArr: TabItem[] = [
  { route: "Home", label: "Home", icon: "home", component: HomeScreen },
  { route: "MyEntries", label: "My Entries", icon: "tasks", component: MyEntriesScreen },
  { route: "Profile", label: "Profile", icon: "user", component: ProfileScreen },
];

const BottomTab: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          height: 60 + insets.bottom, // 👈 increase height with safe area
          // paddingBottom: insets.bottom, // 👈 push icons above the safe area
          bottom: 0,
          right: 0,
          left: 0,
        },
      }}
      initialRouteName="Home"
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTab;

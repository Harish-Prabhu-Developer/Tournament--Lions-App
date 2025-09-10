import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const SplashScreen: React.FC = () => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const footerTranslateY = useSharedValue(20);

  useEffect(() => {
    // Logo zoom + fade
    scale.value = withTiming(1, {
      duration: 1200,
      easing: Easing.out(Easing.exp),
    });

    opacity.value = withTiming(1, {
      duration: 1500,
      easing: Easing.out(Easing.ease),
    });

    // Title animation
    titleTranslateY.value = withDelay(
      600,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) })
    );

    // Footer animation
    footerTranslateY.value = withDelay(
      1000,
      withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) })
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleTranslateY.value }],
    opacity: opacity.value,
  }));

  const footerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: footerTranslateY.value }],
    opacity: opacity.value,
  }));

  return (
    <LinearGradient
     colors={["#0f172a", "#2563eb", "#7c3aed"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >
      {/* Logo with glow */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoGlow} />
        <Animated.View style={logoStyle}>
          <Image
            source={require("../assets/Images/image.png")} // tournament logo
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Title */}
      <Animated.View style={[styles.titleWrapper, titleStyle]}>
        <Text style={styles.title}>9th Lion’s Sivakasi Open</Text>
        <Text style={styles.subtitle}>
          State Level Badminton Tournament
        </Text>
      </Animated.View>

      {/* Footer */}
      <Animated.View style={[styles.footer, footerStyle]}>
        <Text style={styles.footerText}>Powered by</Text>
        <Text style={styles.footerHighlight}>Lions Club of Sivakasi</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoGlow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "transparent", // golden glow
  },
  logo: {
    width: 160,
    height: 160,
  },
  titleWrapper: {
    marginTop: 24,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    color: "#facc15",
    fontSize: 16,
    marginTop: 8,
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerText: {
    color: "#d1d5db",
    fontSize: 14,
  },
  footerHighlight: {
    color: "#facc15",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
});

export default SplashScreen;

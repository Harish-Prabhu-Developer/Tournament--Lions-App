import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface NoInternetProps {
  onRetry?: () => void;
}

const { width } = Dimensions.get("window");

const NoInternet: React.FC<NoInternetProps> = ({ onRetry }) => {
  return (
    <LinearGradient
      colors={["#f9fafb", "#eef2ff"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <FontAwesome name="wifi" size={64} color="#ef4444" />
          <View style={styles.strike} />
        </View>

        <Text style={styles.title}>No Internet Connection</Text>
        <Text style={styles.message}>
          You’re currently offline. Please check your network settings and try again.
        </Text>

        <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.85}>
          <LinearGradient
            colors={["#4f46e5", "#7c3aed"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Retry</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  iconWrapper: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  strike: {
    position: "absolute",
    width: 70,
    height: 4,
    backgroundColor: "#ef4444",
    transform: [{ rotate: "-45deg" }],
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
  },
  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

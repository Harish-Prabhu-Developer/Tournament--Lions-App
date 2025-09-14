import React, { createContext, useContext, useState, useCallback } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextType {
  showToast: (
    msg: string,
    type?: ToastType,
    bgColor?: string,
    duration?: number,
    color?: string
  ) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("info");
  const [visible, setVisible] = useState(false);
  const [customBg, setCustomBg] = useState<string | undefined>();
  const [customColor, setCustomColor] = useState<string | undefined>();
  const [duration, setDuration] = useState(2000);
  const opacity = useState(new Animated.Value(0))[0];

  const showToast = useCallback(
    (
      msg: string,
      t: ToastType = "info",
      bgColor?: string,
      dur: number = 2000,
      color?: string
    ) => {
      setMessage(msg);
      setType(t);
      setCustomBg(bgColor);
      setCustomColor(color);
      setDuration(dur);
      setVisible(true);

      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start(() => setVisible(false));
        }, dur);
      });
    },
    [opacity]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {visible && (
        <Animated.View style={[styles.toastContainer, { opacity }]}>
          <View
            style={[
              styles.toast,
              { backgroundColor: customBg || getBgColor(type) },
            ]}
          >
            <Text style={[styles.toastText, { color: customColor || "#fff" }]}>
              {message}
            </Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const getBgColor = (type: ToastType) => {
  switch (type) {
    case "success":
      return "#22c55e";
    case "error":
      return "#ef4444";
    case "warning":
      return "#f59e0b";
    case "info":
      return "#3b82f6";
    default:
      return "#374151"; // gray
  }
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: "20%",
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  toast: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 6,
  },
  toastText: {
    fontWeight: "600",
    textAlign: "center",
  },
});

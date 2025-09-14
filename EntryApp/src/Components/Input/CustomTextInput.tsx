// CustomTextInput.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  TextStyle,
  Keyboard,
  TextInput as RNTextInput,
  GestureResponderEvent,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type CustomTextInputProps = {
  type?: "text" | "email" | "password" | "phone";
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  style?: StyleProp<TextStyle>;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  placeholderTextColor?: string;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  onSubmitEditing?: () => void;
  blurOnSubmit?: boolean;
  error?: string;
  onFocus?: (e?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  type = "text",
  placeholder,
  value,
  onChangeText,
  keyboardType,
  autoCapitalize = "none",
  autoCorrect = false,
  maxLength,
  multiline,
  numberOfLines,
  editable = true,
  placeholderTextColor = "#9ca3af",
  returnKeyType = "done",
  onSubmitEditing,
  blurOnSubmit = true,
  error,
  style,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<RNTextInput | null>(null);

  // sync external value -> internal
  useEffect(() => {
    if (typeof value !== "undefined" && value !== internalValue) {
      setInternalValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (text: string) => {
    setInternalValue(text);
    onChangeText?.(text);
  };

  const getIcon = () => {
    switch (type) {
      case "email":
        return "envelope";
      case "password":
        return "lock";
      case "phone":
        return "phone";
      default:
        return "user";
    }
  };

  const borderColor = error ? "#dc2626" : focused ? "#4f46e5" : "#d1d5db";

  // Ensures visual focus even if a parent touchable tries to intercept the event
  const handleTouchStart = (e: GestureResponderEvent) => {
    // set visual focus immediately
    setFocused(true);
    // let TextInput handle real focus
    inputRef.current?.focus();
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    onFocusProp?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    onBlurProp?.(e);
  };

  return (
    <View style={styles.container}>
      <View
        // `onStartShouldSetResponder` left default — we rely on touch handlers instead
        style={[styles.inputWrapper, { borderColor }, focused && styles.focusShadow]}
        // ensure quick visual feedback when user taps anywhere on the wrapper
        onTouchStart={handleTouchStart}
      >
        <FontAwesome
          name={getIcon()}
          size={20}
          color={error ? "#dc2626" : focused ? "#4f46e5" : "#6b7280"}
          style={styles.leftIcon}
        />

        <TextInput
          ref={inputRef}
          style={[styles.input, style]}
          placeholder={placeholder}
          value={internalValue}
          onChangeText={handleChange}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          placeholderTextColor={placeholderTextColor}
          returnKeyType={returnKeyType}
          onSubmitEditing={() => {
            onSubmitEditing?.();
            Keyboard.dismiss();
          }}
          blurOnSubmit={blurOnSubmit}
          secureTextEntry={type === "password" && !showPassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {type === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword((s) => !s)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.rightIcon}
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          >
            <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 'auto',
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    minHeight: 56,
  },
  focusShadow: {
    shadowColor: "#4f46e5",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 14,
  },
  rightIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
});

export default CustomTextInput;

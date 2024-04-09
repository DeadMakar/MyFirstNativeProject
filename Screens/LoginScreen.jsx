import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomButton from "../components/CustomButton";
import image from "../assets/images/Photo BG.jpg";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    navigation.navigate("Home");
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigateToRegistration = () => {
    navigation.navigate("Registration");
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-200}
          >
            <View style={styles.loginContainer}>
              <Text style={styles.text}>Увійти</Text>
              <TextInput
                style={[styles.input, isEmailFocused && styles.inputFocused]}
                onChangeText={setEmail}
                value={email}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#bdbdbd"
                keyboardType="email-address"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              ></TextInput>
              <TextInput
                style={[styles.input, isPasswordFocused && styles.inputFocused]}
                onChangeText={setPassword}
                value={password}
                placeholder="Пароль"
                placeholderTextColor="#bdbdbd"
                keyboardType="default"
                secureTextEntry={!showPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              ></TextInput>
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showPasswordButton}
              >
                <Text style={styles.showPasswordButtonText}>
                  {showPassword ? "Приховати" : "Показати"}
                </Text>
              </TouchableOpacity>
              <CustomButton title="Увійти" onPress={handleSubmit} />
              <Text
                style={styles.registerText}
                onPress={navigateToRegistration}
              >
                Немає акаунту? Зареєструватися
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  loginContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 16,
  },
  input: {
    minWidth: 343,
    height: 50,
    borderWidth: 1,
    borderColor: "rgb(232, 232, 232)",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: "rgb(246, 246, 246)",

    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    color: "#212121",
    paddingLeft: 16,
    marginBottom: 16,
  },
  inputFocused: {
    borderColor: "#FF6C00",
  },
  text: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 30,
    letterSpacing: 0.01,
    color: "#212121",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 33,
  },
  registerText: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    color: "#1b4371",
    marginTop: 16,
    marginBottom: 135,
  },
  showPasswordButton: {
    position: "absolute",
    right: 40,
    bottom: 284,
    transform: [{ translateY: -12 }],
  },
  showPasswordButtonText: {
    color: "#1b4371",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    textAlign: "right",
  },
});

export default LoginScreen;

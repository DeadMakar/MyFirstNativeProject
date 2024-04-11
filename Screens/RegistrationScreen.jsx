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
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RegistrationScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [hasAvatar, setHasAvatar] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log("Username:", userName);
    console.log("Email:", email);
    console.log("Password:", password);
    navigation.navigate("Home");
  };

  const handleAvatarPress = () => {
    setHasAvatar(!hasAvatar);
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-150}
          >
            <View style={styles.avatarContainer}>
              {hasAvatar ? (
                <View style={styles.iconContainer}>
                  <SimpleLineIcons
                    name="close"
                    size={25}
                    color="#BDBDBD"
                    onPress={handleAvatarPress}
                  />
                </View>
              ) : (
                <View style={styles.icon}>
                  <SimpleLineIcons
                    name="plus"
                    size={25}
                    color="#FF6C00"
                    onPress={handleAvatarPress}
                  />
                </View>
              )}
            </View>
            <View style={styles.registrationContainer}>
              <Text style={styles.text}>Реєстрація</Text>
              <TextInput
                style={[styles.input, isUsernameFocused && styles.inputFocused]}
                onChangeText={setUserName}
                value={userName}
                placeholder="Логін"
                placeholderTextColor="#bdbdbd"
                keyboardType="default"
                onFocus={() => setIsUsernameFocused(true)}
                onBlur={() => setIsUsernameFocused(false)}
              />
              <TextInput
                style={[styles.input, isEmailFocused && styles.inputFocused]}
                onChangeText={setEmail}
                value={email}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#bdbdbd"
                keyboardType="email-address"
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
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
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showPasswordButton}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="#1b4371"
                />
              </TouchableOpacity>

              <CustomButton title="Зареєструватися" onPress={handleSubmit} />
              <Text style={styles.loginText} onPress={navigateToLogin}>
                Вже є акаунт? Увійти
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
  avatarContainer: {
    position: "absolute",
    bottom: 470,
    right: null,
    left: "50%",
    zIndex: 200,
    borderRadius: 16,
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    marginLeft: -60,
  },
  icon: {
    position: "absolute",
    bottom: 12,
    right: -12.5,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  registrationContainer: {
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
    marginTop: 92,
    marginBottom: 32,
  },
  loginText: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    color: "#1b4371",
    marginTop: 16,
    marginBottom: 29,
  },
  showPasswordButton: {
    position: "absolute",
    right: 40,
    bottom: 175,
    transform: [{ translateY: -12 }],
  },
});

export default RegistrationScreen;

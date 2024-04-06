import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import BG from "../components/BG";

const RegistrationScreen = () => {
  const [userName, onChangeUserName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const handleSubmit = () => {
    // Опрацьовуємо натискання на кнопку тут
    console.log("Button clicked!");
  };

  return (
    <View>
      <BG />
      <View style={styles.container}>
        <Text style={styles.text}>Реєстрація</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUserName}
          value={userName}
          placeholder="Логін"
          keyboardType="default"
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Адреса електронної пошти"
          keyboardType="email-address"
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Пароль"
          keyboardType="default"
        ></TextInput>
        <Button
          title="Зареєструватися"
          onPress={handleSubmit}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 549,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    padding: 16,
  },
  input: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderColor: "rgb(232, 232, 232)",
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
      marginBottom: 16,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    backgroundColor: "rgb(246, 246, 246)",
  },
  text: {
    color: "rgb(33, 33, 33)",
    // fontFamily: "Roboto",
    // fontSize: 30,
    // fontWeight: 500,
    // lineHeight: 35,
    textAlign: "center",
  },
  button: {
    width: 343,
    height: 51,
    borderRadius: 100,
    backgroundColor: "rgb(255, 108, 0)",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegistrationScreen;

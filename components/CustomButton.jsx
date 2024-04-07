import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 343,
    height: 51,
    borderRadius: 100,
    backgroundColor: "rgb(255, 108, 0)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
  },
  buttonText: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
});

export default CustomButton;

import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import BGPhoto from "../assets/images/Photo BG.jpg";

const BG = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={BGPhoto} style={styles.backgroundImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: 395,
    height: "100%",
    resizeMode: "cover",
  },
});

export default BG;

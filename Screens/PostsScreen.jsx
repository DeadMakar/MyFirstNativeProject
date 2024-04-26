import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostsScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Додайте тут логіку для виходу
    navigation.navigate("Registration");
  };

  return (
    <View style={styles.container}>
      {/* Хедер */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Posts</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={30} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Вміст екрану */}
      <View style={styles.content}>
        {/* Здесь відображається вміст екрану */}
      </View>

      <Text style={styles.startText}>PostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "relative",
    height: 88,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerText: {
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.02,
    textAlign: "center",
    color: "#212121",
  },
  iconContainer: {
    position: "absolute",
    right: 16,
    bottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default PostsScreen;

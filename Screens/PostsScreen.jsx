import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PostsScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Додайте тут логіку для виходу
  };

  return (
    <View style={styles.container}>
      {/* Хедер */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Публікації</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Вміст екрану */}
      <View style={styles.content}>
        {/* Здесь відображається вміст екрану */}
      </View>

      <Text style={styles.startText}>CreatePostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 30,
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

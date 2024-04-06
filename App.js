import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import image from "./assets/images/Photo BG.jpg";
// import { LoginScreen } from "./Screens/LoginScreen";
// import PostsScreen from "./Screens/PostsScreen.jsx";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
      {/* <PostsScreen /> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

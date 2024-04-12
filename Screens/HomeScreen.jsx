import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingLeft: 50,
          paddingRight: 50,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="grid-outline" size={24} color="#212121" />
          ),
        }}
      />
      <Tab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View
              style={{
                width: 70,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#ff6c00",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="user-o" size={24} color="#212121" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 212,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;

import React, { useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const CreatePostsScreen = ({ navigation }) => {
  const cameraRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  }, [navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log("Picture taken:", uri);

        const asset = await MediaLibrary.saveToLibraryAsync(uri);

        console.log("Image saved to:", asset);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const openGallery = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        const result = await MediaLibrary.getAssetsAsync({
          mediaType: "photo",
        });
        console.log("Gallery opened:", result);
      } else {
        console.log("Permission denied to access media library");
      }
    } catch (error) {
      console.error("Error opening gallery:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Створити публікацію</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={30} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Вміст екрану */}
      <View style={styles.content}>
        {/* Контейнер для камери */}
        <View style={[styles.cameraContainer, { position: "relative" }]}>
          <Camera
            style={styles.cameraPreview}
            type={Camera.Constants.Type.back}
            ref={cameraRef}
          />
          <View style={styles.cameraIconOuterContainer}>
            <TouchableOpacity onPress={takePicture}>
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={24} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={openGallery}>
          <Text style={styles.cameraText}>Завантажте фото</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              placeholder="Назва..."
              style={styles.inputText}
              placeholderTextColor="#BDBDBD"
            />
          </View>

          <View style={styles.input}>
            <Ionicons
              name="location-outline"
              size={22}
              color="#BDBDBD"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Місцевість..."
              style={styles.inputText}
              placeholderTextColor="#BDBDBD"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Опубліковати</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    left: 16,
    bottom: 10,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  cameraContainer: {
    position: "relative",
    height: 240,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#E8E8E8",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
    overflow: "hidden",
  },
  cameraPreview: {
    flex: 1,
    width: 360,
  },
  cameraIconOuterContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -13 }, { translateY: -25 }],
  },
  cameraIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraText: {
    marginTop: 8,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    minWidth: 343,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 4,
  },
  placeholder: {
    fontFamily: "RobotoMedium",
    fontWeight: "400",
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputText: {
    fontFamily: "RobotoRegular",
    fontWeight: "500",
    fontSize: 16,
    color: "#212121",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f6f6f6",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "RobotoMedium",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    color: "#BDBDBD",
  },
});

export default CreatePostsScreen;

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isPhotoAdded, setIsPhotoAdded] = useState(false); // Доданий новий стан для відстеження наявності фотографії
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const publishPost = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      navigation.navigate("PostsScreen");
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && showCamera) {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === "granted") {
          const { uri } = await cameraRef.current.takePictureAsync();
          console.log("Picture taken:", uri);

          const asset = await MediaLibrary.saveToLibraryAsync(uri);
          if (asset) {
            console.log("Image saved to:", asset);
          } else {
            console.log("Failed to save image to library");
          }

          setCapturedImage(uri);
          setShowCamera(false);
          setIsPhotoAdded(true); // Встановлення стану, що фотографія була додана

          if (currentLocation) {
            const location = await Location.reverseGeocodeAsync({
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            });
            if (location && location.length > 0) {
              const { name } = location[0];
              setLocationName(name);
            }
          }
        } else {
          console.log("Permission not granted for camera");
        }
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    } else {
      console.log("Camera is not running");
    }
  };

  const openGallery = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.cancelled) {
          setCapturedImage(result.assets[0].uri);
          setShowCamera(false);
          setIsPhotoAdded(true); // Встановлення стану, що фотографія була додана
        }
      } else {
        console.log("Permission denied to access media library");
      }
    } catch (error) {
      console.error("Error opening gallery:", error);
    }
  };

  const clearFields = () => {
    setCapturedImage(null);
    setLocationName("");
    setIsPhotoAdded(false); // Очищення стану після очищення полів
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Create a post</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={30} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {showCamera ? (
          <TouchableOpacity
            style={[styles.cameraContainer, { position: "relative" }]}
            onPress={() => setShowCamera(false)}
          >
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
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.cameraContainer, { position: "relative" }]}
            onPress={() => setShowCamera(true)}
          >
            {capturedImage ? (
              <Image
                source={{ uri: capturedImage }}
                style={styles.cameraPreview}
              />
            ) : (
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={24} color="#BDBDBD" />
              </View>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={openGallery}>
          <Text style={styles.cameraText}>
            {capturedImage ? "Edit Photo" : "Upload Photo"}
          </Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              placeholder="Name..."
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
              placeholder={`Locality... ${locationName}`}
              style={styles.inputText}
              placeholderTextColor="#BDBDBD"
            />
          </View>
        </View>

        {/* Відображення кнопок залежно від наявності фотографії */}
        {isPhotoAdded && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.activeButton]}
              onPress={publishPost}
            >
              <Text style={[styles.buttonText, styles.activeButtonText]}>
                Publish
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonDel, styles.activeButton]}
              onPress={clearFields}
            >
              <AntDesign name="delete" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    height: 340,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#F6F6F6",
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
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: "RobotoMedium",
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    color: "#BDBDBD",
  },
  activeButton: {
    backgroundColor: "rgb(255, 108, 0)",
  },
  activeButtonText: {
    color: "#fff",
  },
  buttonDel: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostsScreen;

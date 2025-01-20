import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from 'expo-media-library';
import axios from "axios";

export default function HomeScreen({ navigation }) {
    const [file, setFile] = useState(null);
    const [feeling, setFeeling] = useState('')
  
    const handleWebFileChange = (event) => {
      const uploadedFile = event.target.files[0]; // Get the first file
      if (uploadedFile) {
        setFile({
          uri: URL.createObjectURL(uploadedFile), // Generate a local URL for the file
          name: uploadedFile.name,
          size: uploadedFile.size,
          type: uploadedFile.type,
        });
        Alert.alert("File Selected", `Selected File: ${uploadedFile.name}`);
      } else {
        Alert.alert("Error", "No file selected.");
      }
    };
  
    const handleFileChange = async () => {
      console.log('hello')
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Media library access is required to select files.");
          return;
        }
  
        const res = await DocumentPicker.getDocumentAsync({
          type: "*/*", // Allow all file types
        });
  
        console.log("File picker response:", res);
  
        if (!res.uri) {
          Alert.alert("Error", "Invalid file URI. Please try again.");
          return;
        }
  
        if (res.type === "success") {
          if (
            res.uri && 
            typeof res.uri === 'string' && 
            (res.uri.startsWith('content://') || res.uri.startsWith('file://')) && 
            res.uri !== '' 
          ) {
            setFile(res); 
            Alert.alert("File Selected", `Selected File: ${res.name}`);
          } else {
            Alert.alert("Error", "Invalid file URI."); 
          }
        } else {
          console.log("File selection canceled");
        }
      } catch (error) {
        console.error("Error selecting file:", error);
        Alert.alert("Error", "An error occurred while selecting a file");
      }
    };
  
    const handleConsult = async () => {
  
      navigation.navigate("AIDoctor"); // Remove Later when fixing File Upload and attachment
  
      if (!file) {
        Alert.alert("Error", "Please select a file before consulting");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "application/octet-stream",
      });
  
      try {
        const response = await axios.post(
          `${process.env.AXIOS_BACKEND_URL}/api/login`, 
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

  
        if (response.status === 200) {
          Alert.alert("Success", "File uploaded successfully!");
          navigation.navigate("AIDoctor");
        } else {
          Alert.alert("Error", "Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        Alert.alert("Error", "An error occurred while uploading the file");
      }
    };
  
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome Name!</Text>
        <Text style={styles.label}>How are you feeling today?</Text>
  
          <TextInput
            style={styles.input}
            placeholder="Enter your feeling..."
            value={feeling}
            onChangeText={setFeeling}
          />
    
  
          <TouchableOpacity style={styles.uploadButton} onPress={handleFileChange}>
            <Text>{file ? `📄 File: ${file.name}` : "⬆️ Click to Upload File"}</Text>
          </TouchableOpacity>
  
  
        {file && (
          <Text style={styles.fileDetails}>
            File Attached: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </Text>
        )}
        <TouchableOpacity style={styles.consultButton} onPress={handleConsult}>
          <Text style={styles.buttonText}>Consult</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    label: { marginVertical: 10, fontWeight: "bold" },
    uploadButton: {
      marginVertical: 10,
      borderWidth: 1,
      alignItems: "center",
      padding: 10,
      backgroundColor: "#f0f0f0",
    },
    fileDetails: {
      marginTop: 10,
      color: "green",
      fontWeight: "bold",
    },
    consultButton: {
      backgroundColor: "black",
      padding: 15,
      alignItems: "center",
      marginTop: 20,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    buttonText: { color: "white", fontWeight: "bold" },
  });
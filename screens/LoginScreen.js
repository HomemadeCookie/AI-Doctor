import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,  Alert } from "react-native";
import axios from "axios"

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
  
    const handleLogin = async () => {
      console.log('handle Login running');
      if (!email || !password){
        Alert.alert('Error', "Please fill in both fields")
        return
      }
      
      try{
        Alert.alert('hello');
        // const response = await axios.post("http://LAPTOP-DLAO9MB3:5000/api/login", {
        //   email,
        //   password
        // })
        console.log(`${process.env.AXIOS_BACKEND_URL}`)
        const response = await axios.post(`${process.env.AXIOS_BACKEND_URL}/api/login`, {
          email,
          password
        })
        // const response = await axios.post(`http://192.168.157.164:5000/api/login`, {
        //   email,
        //   password
        // })
        console.log(response.status, typeof(response.status))
        if (response.status == 200){
          // console.log(response.id)
          Alert.alert("Success", "Logged in successfully")
          navigation.navigate("Home")
        } else if (response.status == 201){
          Alert.alert("Try Again", "Username doesn't exist")
        } else if (response.status == 202){
          Alert.alert("Try Again", "Invalid password")
        } else {
          Alert.alert("Error", response.data.message || "An error occurred")
        }
      } catch (error) {
        console.error("Error Details:", error.toJSON ? error.toJSON() : error);
        Alert.alert("Error", "Unable to connect to the server");
      }
    }
  
  
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Glad you're prioritizing your health!</Text>
        <TextInput style={styles.input} placeholder="Username" value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
        <TouchableOpacity style={styles.button} onPress={() => {
            console.log('Button pressed');
            handleLogin();
          }}>
          <Text style={styles.buttonText} >Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signup}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={{ color: "grey" }}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    heading: { fontWeight: "bold", fontSize: 20, marginBottom: 20 },
    input: { borderBottomWidth: 1, marginVertical: 10, padding: 8 },
    button: {
      backgroundColor: "black",
      padding: 15,
      marginTop: 20,
      alignItems: "center",
    },
    buttonText: { color: "white", fontWeight: "bold" },
    signup: { alignItems: "center", marginTop: 10 },
  });
  
import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios"

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    console.log('handle Signup running');
    if (!email || !password){
      Alert.alert('Error', "Please fill in both fields")
      return
    }

    try{
      // const response = await axios.post("http://LAPTOP-DLAO9MB3:5000/api/signup", {
      //   email,
      //   password
      // })
      const response = await axios.post(`${process.env.AXIOS_BACKEND_URL}/api/login`, {
        email,
        password
      })

      if (response.status === 200){
        Alert.alert("Success", "Account created successfully")
        navigation.navigate("Login")
      } else {
        Alert.alert("Error", response.data.message || "An error occured")
      }
    } catch (error) {
      console.error(error)
      Alert.alert("Error", "Unable to connect to the server")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Glad you're prioritizing your health!</Text>
      <TextInput style={styles.input} placeholder="Username" value={email} onChangeText={(text) => setEmail(text)} />
      <TextInput style={styles.input} placeholder="Password"  secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "grey" }}>Log in</Text>
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
  login: { alignItems: "center", marginTop: 10 },
});

import { StyleSheet, View, Image, KeyboardAvoidingView } from "react-native";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser)=>{
        console.log(authUser.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style="light"/>
      <Image
        source={require("../Images/chat_logo.png")}
        style={styles.logo}
      ></Image>
      <View style={styles.inner_container}>
        <Input
          placeholder="Enter Email ID"
          type="email"
          value={email}
          autoFocus
          onChangeText={(text) => setEmail(text.toLowerCase())}
        ></Input>
        <Input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text.toLowerCase())}
          secureTextEntry
        ></Input>
      </View>
      <Button style={styles.btn} title="Sign In" onPress={signIn} />
      <Button
        style={styles.btn}
        title="Sign Up"
        type="outline"
        onPress={() => navigation.navigate("Register")}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: "center",
  },
  inner_container: {
    width: 300,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 50,
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    marginTop: 10,
    width: 200,
  },
});

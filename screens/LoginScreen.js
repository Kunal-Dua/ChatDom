import { StyleSheet, View, Image, KeyboardAvoidingView } from "react-native";
import { Button, Input } from "react-native-elements";
import React, { useState } from "react";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {};
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
          onChangeText={(text) => setEmail(text)}
        ></Input>
        <Input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        ></Input>
      </View>
      <Button style={styles.btn} title="Sign In" onPress={signIn} />
      <Button
        style={styles.btn}
        title="Sign Up"
        type="outline"
        onPress={() => navigation.navigate("signUp")}
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

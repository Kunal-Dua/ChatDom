import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageURL ||
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FhwwTxRJ_person-man-user-account-profile-employee-profile-template%2F&psig=AOvVaw0jET3Kf3YBlKGNV5-2x2x4&ust=1672512849196000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMjX8YOCovwCFQAAAAAdAAAAABAJ",
        });
        navigation.goBack();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text
        style={{
          fontSize: 32,
          color: "black",
          marginTop: 10,
          marginBottom: 50,
        }}
      >
        Register To Chat Dom
      </Text>
      <Input
        placeholder="Enter Full name"
        type="name"
        value={name}
        autoFocus
        onChangeText={(text) => setName(text)}
      ></Input>
      <Input
        placeholder="Enter Email ID"
        type="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      ></Input>
      <Input
        placeholder="Enter Password"
        type="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      ></Input>
      <Input
        placeholder="Enter Image URL"
        type="image"
        value={imageURL}
        onChangeText={(text) => setImageURL(text)}
      ></Input>
      <Button style={styles.btn} title="Sign Up" onPress={signUp} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
  },
  btn: {
    marginTop: 10,
    width: 150,
  },
});

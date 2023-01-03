import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button, Input } from "react-native-elements";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import { doc, setDoc, updateDoc, addDoc, collection } from "firebase/firestore";

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  const signUp = async () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageURL ||
            "https://www.shutterstock.com/image-vector/person-gray-photo-placeholder-man-260nw-1406263799.jpg",
        });
      })
      .then(async () => {
        //Creating user
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          displayName: name,
          emailID: email,
          photoURL:
            imageURL ||
            "https://www.shutterstock.com/image-vector/person-gray-photo-placeholder-man-260nw-1406263799.jpg",
          groupUID: [],
        });

        //Creating User Chats
        await setDoc(doc(db, "userChats", auth.currentUser.uid), {});
        navigation.replace("Home");
      })
      .catch((error) => alert(error.message), navigation.navigate("Login"));
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
        onChangeText={(text) => setEmail(text.toLowerCase())}
      ></Input>
      <Input
        placeholder="Enter Password"
        type="password"
        value={password}
        onChangeText={(text) => setPassword(text.toLowerCase())}
        secureTextEntry
      ></Input>
      <Input
        placeholder="Enter Image URL (Optional)"
        type="imageURL"
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

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import React, { useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const AddChat = ({ navigation }) => {
  const currentUser = auth.currentUser;
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");

  const submit = async () => {
    const q = query(collection(db, "users"), where("emailID", "==", input));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
    console.log(user);
  };

  const handleAddUser = async () => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log(currentUser.displayName);
    try {
      const res = await getDoc(doc(db, "chats", combinedID));
      if (!res.exists()) {
        // make chats collection if no chat between users
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        // update doc for current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedID + ".userInfo1"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            combinedID: combinedID,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userInfo2"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            combinedID: combinedID,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
        alert(input + " added successfully");
        navigation.goBack();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chats",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    });
  }, []);

  return (
    <View>
      <Input
        placeholder="Enter Email Id"
        type="input"
        value={input}
        onChangeText={(text) => setInput(text.toLowerCase())}
        autoFocus
      ></Input>
      <Button style={styles.btn} title="Submit" onPress={submit} />
      {user && (
        <TouchableOpacity onPress={handleAddUser}>
          <View>
            <Avatar rounded size={"medium"} source={user.photoURL.toString()} />
            <Text style={{ fontSize: "24", marginLeft: 20 }}>
              {user.displayName}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({});

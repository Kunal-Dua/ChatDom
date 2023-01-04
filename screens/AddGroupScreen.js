import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import React, { useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  increment,
  Timestamp,
} from "firebase/firestore";

const AddGroupScreen = ({ navigation }) => {
  const currentUser = auth.currentUser;
  const [input, setInput] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupPhotoURL, setGroupPhotoURL] = useState("");
  const [user, setUser] = useState("");

  const submit = async () => {
    if (groupName == "") {
      alert("Enter Group name");
      return;
    }
    if (input == "") {
      alert("Enter user Email Id");
      return;
    }
    const q = query(collection(db, "users"), where("emailID", "==", input));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  const handleAddUser = async () => {
    try {
      const res = await addDoc(collection(db, "group"), {});
      await updateDoc(doc(db, "group", res.id), {
        displayName: groupName,
        groupAdmin: currentUser.uid,
        groupAdminName: currentUser.displayName,
        totalGroupMembers: 2,
        photoURL:
          groupPhotoURL ||
          "https://img.freepik.com/premium-photo/fire-alphabet-letter-g-isolated-black-background_564276-8948.jpg?w=2000",
        groupMembersUID: arrayUnion(currentUser.uid, user.uid),
        groupMembersName: arrayUnion(currentUser.displayName, user.displayName),
        lastMessage: "You are added to Group",
        dateCreated: Timestamp.now(),
      });

      await setDoc(doc(db, "groupChats", res.id), {});

      await updateDoc(doc(db, "groupChats", res.id), {
        uid: res.id,
        displayName: groupName,
        photoURL:
          groupPhotoURL ||
          "https://img.freepik.com/premium-photo/fire-alphabet-letter-g-isolated-black-background_564276-8948.jpg?w=2000",
        ["date"]: Timestamp.now(),
        ["lastMessage"]: {
          message: "You are added to Group",
        },
      });

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        groupUID: arrayUnion(res.id),
      });

      await updateDoc(doc(db, "users", user.uid), {
        groupUID: arrayUnion(res.id),
      });

      // chats of group with res id
      await setDoc(doc(db, "chats", res.id), { messages: [] });

      alert(input + " added successfully");
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add user to Group",
      headerStyle: { backgroundColor: "#ADD8E6" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input
        placeholder="Enter Group Name"
        type="groupName"
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        autoFocus
        style={styles.inp}
      ></Input>
      <Input
        placeholder="Enter Group Photo URL (Optional)"
        type="groupPhotoURL"
        value={groupPhotoURL}
        onChangeText={(text) => setGroupPhotoURL(text)}
        style={styles.inp}
      ></Input>
      <Input
        placeholder="Enter Email Id"
        type="input"
        value={input}
        onChangeText={(text) => setInput(text.toLowerCase())}
        style={styles.inp}
      ></Input>
      <Button style={styles.btn} title="Submit" onPress={submit} />
      {user && (
        <TouchableOpacity onPress={handleAddUser}>
          <Text style={styles.txtForUsers}>Users Found:-</Text>
          <View style={styles.userToAdd}>
            <Avatar
              size={"medium"}
              rounded
              source={{
                uri: user?.photoURL?.toString(),
              }}
            />
            <Text style={{ fontSize: "24", marginLeft: 20 }}>
              {user.displayName}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddGroupScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 20,
  },
  btn: {
    width: 120,
  },
  txtForUsers: {
    marginTop: 15,
    fontSize: 22,
  },
  userToAdd: {
    marginTop: 30,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
    width: 350,
  },
});

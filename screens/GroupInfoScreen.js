import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Button, Icon, Input } from "react-native-elements";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { db, auth } from "../firebase";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  query,
  collection,
  getDocs,
  where,
  increment,
} from "firebase/firestore";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const GroupInfoScreen = ({ navigation, route }) => {
  const currentUser = auth?.currentUser; //current user auth data
  const [user, setUser] = useState("");
  const [input_emailID, setInput_emailID] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerTitle: () => (
        <View style={styles.title}>
          <Text style={{ marginLeft: 5, fontSize: 18 }}>
            Group Info {route.params.displayName}
          </Text>
        </View>
      ),
    });
  }, [navigation]);
  const handleAddUser = async () => {
    try {
      await updateDoc(doc(db, "group", route.params.uid), {
        ["groupInfo"]: {
          totalGroupMembers: increment(1),
        },
        groupMembersUID: arrayUnion(user.uid),
        groupMembersName: arrayUnion(user.displayName),
      });

      await updateDoc(doc(db, "users", user.uid), {
        groupUID: arrayUnion(route.params.uid),
      });

      alert(input_emailID + " added successfully");
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };
  const addUserButton = async () => {
    const q = query(
      collection(db, "users"),
      where("emailID", "==", input_emailID)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
    console.log(user);
  };
  return (
    <View>
      <Input
        placeholder="Add new user to group"
        type="password"
        value={input_emailID}
        onChangeText={(text) => setInput_emailID(text.toLowerCase())}
        onSubmitEditing={addUserButton}
      />
      <Button title={"Add user"} onPress={addUserButton} />
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

export default GroupInfoScreen;

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        margin: 20,
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

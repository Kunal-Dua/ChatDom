import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Avatar, Icon } from "react-native-elements";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";
import CustomListItem from "./CustomListItem";
import AddChat from "./AddChat";
import { onSnapshot, doc } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const currentUser = auth?.currentUser;
  const addChat = () => {
    navigation.navigate("AddChat");
  };

  const [chats, setChats] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "userChats", currentUser.uid),
      (doc) => {
        setChats(doc.data());
      }
    );
    return unsubscribe;
  }, [currentUser.uid]);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
        alert("Sign out successfull");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chats",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity onPress={signOut}>
            <Avatar
              rounded
              source={{
                uri: currentUser?.photoURL?.toString(),
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity onPress={addChat}>
            <Icon name="add" size={40} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const enterChat = (uid, displayName, photoURL, emailID) => {
    navigation.navigate("Chat", {
      uid,
      displayName,
      photoURL,
      emailID,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        {chats &&
          Object?.entries(chats)
            ?.sort((a, b) => a[1].date - b[1].date)
            ?.map((chat) => (
              <CustomListItem
                key={chat[0]}
                uid={chat[0]}
                displayName={chat[1].userInfo.displayName}
                photoURL={chat[1].userInfo.photoURL}
                emailID={chat[1].userInfo.emailID}
                enterChat={enterChat}
              />
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  inner_container: {},
});

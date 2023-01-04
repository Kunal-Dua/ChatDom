import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import { Avatar, Icon } from "react-native-elements";
import { auth, db } from "../firebase";
import CustomListItem from "./CustomListItem";
import { onSnapshot, doc } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  let groupUIDS = []; // group IDS array from user db
  let groupChat = []; // stores group chat when it is received from groupChats db
  const [chats, setChats] = useState([]); //stores user chats
  const [groupChats1, setGroupChats1] = useState([]); //stores group chats
  const currentUser = auth?.currentUser; //current user auth data

  const addChat = () => {
    navigation.navigate("AddChat");
    // to add more chats
  };

  const getGroupUIDS = async () => {
    const snap = await db
      .collection("users", currentUser?.uid)
      .where("displayName", "==", currentUser.displayName)
      .get(); // gets groupIDS array from user db

    snap.forEach((doc) => {
      const arr = doc.data().groupUID;
      for (let x of arr) {
        groupUIDS.push(x); //pushes groupIDS to groupIDS array
      }
    });
    
    // console.log(groupUIDS);
    for (let x of groupUIDS) {
      // console.log(x);
      const snap2 = await db
        .collection("groupChats", x)
        .where("uid", "==", x)
        .get(); //gets group chats from groupIDS array of current user
        
      snap2.forEach((doc) => {
        // console.log(doc.data());
        groupChat.push(doc.data()); //pushes group chat to groupChat array
      });
    }
    setGroupChats1(groupChat); //pushes group chat array to groupChat state
    // console.log(groupChats1);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "userChats", currentUser?.uid),
      (doc) => {
        setChats(doc.data());
      }
    );
    //used to get current users chat from userChats db
    return unsubscribe;
  }, [currentUser?.uid]);

  useEffect(() => {
    getGroupUIDS(); //gets group IDS array from user db
    //isFocused is used to update screen when screen is back from goBack funtion of chat screen it is being used as we are not using onsnapshot in group so we are able to get lastmessage update without isFousced
  }, [currentUser?.uid,isFocused]);

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
  }, [currentUser?.uid]);

  const enterChat = (uid, displayName, photoURL, other, lastMessage, group) => {
    navigation.navigate("Chat", {
      uid,
      displayName,
      photoURL,
      other,
      lastMessage,
      group,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView style={{ height: "100%" }}>
        {chats &&
          Object?.entries(chats) // Object entries used to access Object in  chats
            ?.sort((a, b) => b[1].date - a[1].date) //sorting using date of chat
            ?.map(
              (
                chat // map used to map chat array to display
              ) => (
                <CustomListItem
                  key={chat[0]}
                  uid={chat[0]}
                  displayName={chat[1]?.userInfo?.displayName}
                  photoURL={chat[1]?.userInfo?.photoURL}
                  other={chat[1]?.userInfo?.uid}
                  lastMessage={chat[1]?.lastMessage?.message}
                  group={false}
                  enterChat={enterChat}
                />
              )
            )}

        {/* {groupChats1.map((chat) => {console.log(chat)})} */}
            {/* {console.log(groupChats1)} */}
        {
          groupChats1.map((chat) => (
            <CustomListItem
              key={chat?.uid}
              uid={chat?.uid}
              displayName={chat?.displayName}
              photoURL={chat?.photoURL}
              other={chat?.uid}
              lastMessage={chat?.lastMessage?.message}
              group={true}
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

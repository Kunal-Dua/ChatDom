import { Keyboard, Platform, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Icon, Input } from "react-native-elements";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { db, auth } from "../firebase";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const currentUser = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef();
  const isGroup = route.params.group;
  const uid = route.params.uid;
  const displayName = route.params.displayName;

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "chats", route.params.uid),
      (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      }
    );
    return unsubscribe;
  }, [route.params.uid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerTitle: () => (
        <View style={styles.title}>
          <Avatar rounded source={{ uri: route.params.photoURL }} />
          <Text style={{ marginLeft: 5, fontSize: 18 }}>
            {route.params.displayName}
          </Text>
        </View>
      ),
    });

    if (isGroup) {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.headerRight}>
            <Icon
              name="edit"
              onPress={() => {
                navigation.navigate("GroupInfo", {
                  uid,
                  displayName,
                });
              }}
            />
          </View>
        ),
      });
    }
  }, [navigation, isFocused]);

  const sendMessage = () => {
    if (isGroup) {
      sendMessageGroup();
    } else {
      sendMessageUser();
    }
  };

  const sendMessageGroup = async () => {
    if (input !== "") {
      setInput("");
      await updateDoc(doc(db, "chats", route.params.uid), {
        messages: arrayUnion({
          senderID: auth.currentUser.uid,
          displayName: currentUser.displayName,
          message: input,
          timestamp: Timestamp.now(),
          photoURL: currentUser.photoURL,
        }),
      });
    }
    try {
      await updateDoc(doc(db, "groupChats", route.params.uid), {
        lastMessage: {
          message: input,
        },
        date: Timestamp.now(),
      });
    } catch (error) {
      alert(error.message);
    }
    Keyboard.dismiss();
  };

  const sendMessageUser = async () => {
    if (input !== "") {
      setInput("");
      await updateDoc(doc(db, "chats", route.params.uid), {
        messages: arrayUnion({
          senderID: auth.currentUser.uid,
          displayName: currentUser.displayName,
          message: input,
          timestamp: Timestamp.now(),
          photoURL: currentUser.photoURL,
        }),
      });
    }
    try {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [route.params.uid + ".lastMessage"]: {
          message: input,
        },
        [route.params.uid + ".date"]: Timestamp.now(),
      });

      await updateDoc(doc(db, "userChats", route.params.other), {
        [route.params.uid + ".lastMessage"]: {
          message: input,
        },
        [route.params.uid + ".date"]: Timestamp.now(),
      });
    } catch (error) {
      alert(error.message);
    }
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              {/* {messages?.map((data) => console.log(data))} */}
              {messages.map((data) =>
                currentUser.uid === data.senderID ? (
                  <View style={styles.user}>
                    <Text style={styles.userText}>{data.message}</Text>
                    <Avatar
                      rounded
                      size={30}
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -15,
                      }}
                      position="absolute"
                      bottom={-15}
                      right={-15}
                      source={{ uri: data.photoURL }}
                    />
                    {/* <Text style={styles.displayNameOnChat}>{" "}{data.displayName}{" "}</Text> */}
                  </View>
                ) : (
                  <View style={styles.talkingTo}>
                    <Text style={styles.talkingToText}>{data.message}</Text>
                    <Avatar
                      rounded
                      size={30}
                      //WEB
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -15,
                      }}
                      position="absolute"
                      bottom={-15}
                      right={-15}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.displayNameOnChat}>
                      {data.displayName}
                    </Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder={"Enter message"}
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Icon name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}></View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    marginRight: 20,
  },
  user: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  userText: {},
  talkingTo: {
    padding: 15,
    backgroundColor: "#00FF00",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  talkingToText: {},
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
    marginTop: 10,
  },
  displayNameOnChat: {
    position: "absolute",
    bottom: -25,
    right: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});

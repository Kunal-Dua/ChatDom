import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Icon, Input } from "react-native-elements";
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
} from "firebase/firestore";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ChatScreen = ({ navigation, route }) => {
  const currentUser = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef();

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
  }, [navigation]);

  const sendMessage = async () => {
    if (input !== "") {
      setInput("");
      await updateDoc(doc(db, "chats", route.params.uid), {
        messages: arrayUnion({
          senderID: auth.currentUser.uid,
          displayName: route.params.displayName,
          message: input,
          timestamp: Timestamp.now(),
        }),
      });
      Keyboard.dismiss();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              {messages.map((data) =>
                currentUser.uid === data.senderID ? (
                  <View style={styles.user}>
                    <Text style={styles.userText}>{data.message}</Text>
                  </View>
                ) : (
                  <View style={styles.talkingTo}>
                    <Text style={styles.talkingToText}>{data.message}</Text>
                  </View>
                )
              )}
            </ScrollView>
          </>
        </TouchableWithoutFeedback>

        <View style={styles.footer}>
          <Input
            placeholder={"Enter message"}
            style={styles.textInput}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <TouchableOpacity
            onPress={sendMessage}
            activeOpacity={0.5}
            style={{ marginBottom: 80 }}
          >
            <Icon name="send" size={24} color="#2B68E6" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  user: {
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
    bottom: 40,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 3,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    padding: 15,
    alignContent: "center",
  },
});

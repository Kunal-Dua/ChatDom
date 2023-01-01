import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar, Icon, Input } from "react-native-elements";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const ChatScreen = ({ navigation, route }) => {
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

  const sendMessage = () => {
    Keyboard.dismiss();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={100}
      >
        <>
          <ScrollView>
            
          </ScrollView>
          <View style={styles.footer}>
            <Input placeholder={"Enter message"} style={styles.textInput} />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Icon name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
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
  textInput: {
    bottom: 0,
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
    width: "100%",
    padding: 15,
  },
});

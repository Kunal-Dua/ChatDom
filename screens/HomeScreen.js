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
import React, { useLayoutEffect } from "react";
import { auth } from "../firebase";
import CustomListItem from "./CustomListItem";
import AddChat from "./AddChat";


const HomeScreen = ({ navigation }) => {
  const user = auth?.currentUser;
  const addChat=()=>{
    navigation.navigate("AddChat");
  }
  const signOut=()=>{
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
        alert("Sign out successfull");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
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
                uri: user?.photoURL?.toString(),
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

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
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

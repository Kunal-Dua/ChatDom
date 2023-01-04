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

const AddUserToGroupScreen = ({ navigation ,route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerTitle: () => (
        <View style={styles.title}>
          <Text style={{ marginLeft: 5, fontSize: 18 }}>
            Add user to Group {route.params.displayName}
          </Text>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>AddUserToGroup</Text>
    </View>
  )
}

export default AddUserToGroupScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import React from "react";

const CustomListItem = ({ uid, displayName, photoURL,other,enterChat,lastMessage }) => {
  return (
    <ListItem onPress={()=>{enterChat(uid,displayName,photoURL,other,lastMessage)}} bottomDivider>
      <Avatar
        size={"medium"}
        rounded
        source={{
          uri: photoURL,
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{displayName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

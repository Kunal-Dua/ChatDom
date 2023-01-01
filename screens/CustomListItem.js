import { StyleSheet, Text, View } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import React from "react";

const CustomListItem = ({ uid, displayName, photoURL,enterChat }) => {
  return (
    <ListItem onPress={()=>{enterChat(uid,displayName,photoURL)}} bottomDivider>
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
          Hello
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

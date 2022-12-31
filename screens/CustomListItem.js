import { StyleSheet, Text, View } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import React from "react";

const CustomListItem = () => {
  return (
    <ListItem>
      <Avatar rounded />
      <ListItem.Content>
        <ListItem.Title>Name</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">Hello</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

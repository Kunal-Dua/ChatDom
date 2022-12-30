import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { Avatar } from 'react-native-elements';
import React from 'react'
import {auth} from '../firebase'

const HomeScreen = () => {
  const user=auth.currentUser;
  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <View style={styles.banner}>
        <Avatar source={user.photoURL.toString()} />
<Text>fghjk</Text>
      </View>
      <View style={styles.inner_container}>
      <Text>fghjk</Text>

      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    margin:10,
  },
  inner_container:{

  },
  banner:{
    height:50,

  }
})
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./screens/ChatScreen";
import Home from "./screens/HomeScreen";
import Login from "./screens/LoginScreen";
import signUp from "./screens/SignUpScreen";
import AddChat from "./screens/AddChat";
import AddGroup from "./screens/AddGroupScreen";
import AddUserToGroup from "./screens/AddUserToGroupScreen";
import GroupInfo from "./screens/GroupInfoScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#ADD8E6" },
          headerTitleStyle: { color: "black" },
          headerTintColor: "black",
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={signUp} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="AddGroup" component={AddGroup} />
        <Stack.Screen name="AddUserToGroup" component={AddUserToGroup} />
        <Stack.Screen name="GroupInfo" component={GroupInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});

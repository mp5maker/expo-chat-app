import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import socket from "./src/utilties/socket";

export default function App() {
  React.useEffect(() => {
    socket.connect();
    socket.emit("CHAT_MESSAGE", "Bro I am awesome");
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

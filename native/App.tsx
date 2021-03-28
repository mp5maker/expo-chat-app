import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet } from "react-native";
import socket from "./src/utilties/socket";
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Body } from "./src/components/body";

export default function App() {
  React.useEffect(() => {
    socket.connect();
    socket.emit("CHAT_MESSAGE", "Bro I am awesome");
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <Body style={[styles.container]}>
        <StatusBar style="auto" />
        <Navigation />
      </Body>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

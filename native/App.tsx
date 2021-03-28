import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Body } from "./src/components/body";
import { AuthContextProvider } from "./src/contexts/auth-context";

export default function App() {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <Body style={[styles.container]}>
          <StatusBar style="auto" />
          <Navigation />
        </Body>
      </SafeAreaProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

import * as React from "react";
import { View } from "../../components/view";
import { Text } from "../../components/text";
import TextInput from "../../components/text-input";
import Button from "../../components/button";
import { StyleSheet } from "react-native";

const LoginScreen = (): JSX.Element => {
  const [username, setUsername] = React.useState<string>("");

  const onChangeText = React.useCallback((text) => {
    setUsername(text);
  }, []);

  const onPress = React.useCallback(() => {
    console.log(username);
  }, [username]);

  return (
    <View style={[styles.container]}>
      <View style={[{ width: "100%", padding: 16, height: "100%" }]}>
        <View style={[{ marginVertical: 16 }]}>
          <TextInput
            style={[
              {
                paddingHorizontal: 8,
              },
            ]}
            value={username}
            onChangeText={onChangeText}
            placeholder={"Your Username"}
          />
        </View>
        <Button
          onPress={onPress}
          style={[
            {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightgrey",
              minHeight: 40,
            },
          ]}
        >
          <Text>Send</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;

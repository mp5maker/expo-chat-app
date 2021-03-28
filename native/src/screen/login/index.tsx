import * as React from "react";
import { View } from "../../components/view";
import { Text } from "../../components/text";
import TextInput from "../../components/text-input";
import Button from "../../components/button";
import { StyleSheet } from "react-native";
import socket from "../../utilties/socket";
import * as Routes from "../../constants/routes";
import useAuth from "../../hooks/useAuth";
import * as Actions from "../../constants/actions";

const LoginScreen = ({ navigation }: any): JSX.Element => {
  const { state, dispatch }: any = useAuth();
  const username = state?.username;

  const onChangeText = React.useCallback((text) => {
    dispatch({
      type: Actions.AUTH.CHANGE_USERNAME,
      value: text,
    });
  }, []);

  const onPress = React.useCallback(() => {
    // @ts-ignore
    socket.auth = { username };
    socket.connect();
    socket.emit("CHAT_MESSAGE", "Bro I am awesome");
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    socket.on("connect_error", (error) => {
      if (error.message === "INVALID_USERNAME") {
        return;
      }
    });
    // navigation.navigate(Routes.HOME_SCREEN.name);
  }, [username]);

  React.useEffect(() => {
    return () => {
      socket.off("connect_error");
    };
  });

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

import * as React from "react";
import View from "../../components/view";
import Text from "../../components/text";
import TextInput from "../../components/text-input";
import Button from "../../components/button";
import { StyleSheet } from "react-native";
import socket from "../../utilties/socket";
import * as Routes from "../../constants/routes";
import useAuth from "../../hooks/useAuth";
import * as Actions from "../../constants/actions";
import get from "lodash/get";
import SOCKETS from "../../constants/sockets";
import Header from "../../components/header";

const LoginScreen = ({ navigation }: any): JSX.Element => {
  const { state, dispatch }: any = useAuth();
  const username = get(state, "username", "");

  const onChangeText = React.useCallback((text) => {
    dispatch({
      type: Actions.AUTH.CHANGE_USERNAME,
      value: text,
    });
  }, []);

  const onPress = React.useCallback(() => {
    // Connection
    socket.auth = { username };
    socket.connect();

    // Receive
    socket.on(SOCKETS.CONNECT_ERROR, (error: any) => {
      if (error.message === "INVALID_USERNAME") {
        return;
      }
    });
    navigation.navigate(Routes.HOME_SCREEN.name);
  }, [username]);

  React.useEffect(() => {
    return () => {
      socket.off(SOCKETS.CONNECT_ERROR);
    };
  }, []);

  return (
    <View>
      <Header />
      <View
        style={[
          { width: "100%", padding: 16, height: "95%" },
          styles.container,
        ]}
      >
        <View style={[{ marginVertical: 16, width: "100%" }]}>
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
              width: "100%",
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

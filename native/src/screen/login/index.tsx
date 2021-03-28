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
import useCommon from "../../hooks/useCommon";

const LoginScreen = ({ navigation }: any): JSX.Element => {
  const { state: authState, dispatch: authDispatch }: any = useAuth();
  const { state: commonState, dispatch: commonDispatch }: any = useCommon();
  const username = get(authState, "username", "");
  const indicator = get(commonState, "indicator", false);

  const onChangeText = React.useCallback((text) => {
    authDispatch({
      type: Actions.AUTH.CHANGE_USERNAME,
      value: text,
    });
  }, []);

  const onPress = React.useCallback(() => {
    commonDispatch({
      type: Actions.COMMON.CHANGE_INDICATOR,
      value: true,
    });
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
    commonDispatch({
      type: Actions.COMMON.CHANGE_INDICATOR,
      value: false,
    });
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
          disabled={indicator}
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

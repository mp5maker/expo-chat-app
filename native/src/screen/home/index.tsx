import * as React from "react";
import View from "../../components/view";
import Text from "../../components/text";
import useAuth from "../../hooks/useAuth";
import get from "lodash/get";
import socket from "../../utilties/socket";
import SOCKETS from "../../constants/sockets";
import Header from "../../components/header";
import Button from "../../components/button";
import * as Routes from "../../constants/routes";
import Icon from "../../components/icon";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation }: any): JSX.Element => {
  const { state }: any = useAuth();
  const username = get(state, "username", "");
  const isFocused = useIsFocused();

  const back = React.useCallback(() => {
    navigation.navigate(Routes.LOGIN_SCREEN.name);
  }, []);

  React.useEffect(() => {
    socket.auth = { username };
    socket.connect();

    // Ask for users
    socket.emit(SOCKETS.GIVE_ALL_USERS);

    // Send Message
    socket.emit(SOCKETS.SEND_CHAT_MESSAGE, "Bro I am awesome");

    // Receive Chat Message
    socket.on(SOCKETS.CHAT_MESSAGES, (message: any) => {
      console.log("🚀 ~ file: index.tsx ~ line 18 ~ socket.on ~ args", message);
    });

    // Receive list of users
    socket.on(SOCKETS.ALL_USERS, (users: Array<any>) => {
      console.log(users);
    });

    socket.onAny((event: any, ...args: any) => {
      // console.log(event, args);
    });

    return () => {
      socket.off(SOCKETS.CONNECT_ERROR);
    };
  }, [isFocused]);

  return (
    <View>
      <Header>
        <Button>
          <Icon name={"chevron-left"} onPress={back} size={20} />
        </Button>
      </Header>
      <View style={[{ padding: 16 }]}>
        <Text>Hello</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

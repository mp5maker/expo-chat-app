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
import useCommon from "../../hooks/useCommon";
import * as Actions from "../../constants/actions";
import FlatList from "../../components/flat-list";
import { StyleSheet } from "react-native";

const HomeScreen = ({ navigation }: any): JSX.Element => {
  const { state: authState }: any = useAuth();
  const { state: commonState, dispatch: commonDispatch }: any = useCommon();
  const username = get(authState, "username", "");
  const indicator = get(commonState, "indicator", false);
  const isFocused = useIsFocused();
  const [users, setUsers] = React.useState<Array<any>>([]);

  const back = React.useCallback(() => {
    navigation.navigate(Routes.LOGIN_SCREEN.name);
  }, []);

  const goToDetails = React.useCallback(({ item }) => {
    navigation.navigate(Routes.HOME_DETAILS_SCREEN.name, {
      item,
    });
  }, []);

  React.useEffect(() => {
    socket.auth = { username };
    socket.connect();

    // Send Message
    socket.emit(SOCKETS.SEND_CHAT_MESSAGE, "Bro I am awesome");

    // Receive Chat Message
    // socket.on(SOCKETS.CHAT_MESSAGES, (message: any) => {
    // console.log("🚀 ~ file: index.tsx ~ line 18 ~ socket.on ~ args", message);
    // });

    // Receive list of users
    socket.on(SOCKETS.ALL_USERS, (_users: Array<any>) => {
      _users.forEach((user) => {
        user.self = user.userID === socket.id;
      });

      const sortedUsers = _users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setUsers(sortedUsers);
      commonDispatch({
        type: Actions.COMMON.CHANGE_INDICATOR,
        value: false,
      });
    });

    // Receive the new user
    socket.on(SOCKETS.NEW_USER_CONNECTED, (user: any) => {
      console.log(user);
    });

    // Debug
    // socket.onAny((event: any, ...args: any) => {
    //   console.log(event, args);
    // });
  }, []);

  React.useEffect(() => {
    commonDispatch({
      type: Actions.COMMON.CHANGE_INDICATOR,
      value: true,
    });
    // Ask for users
    socket.emit(SOCKETS.GIVE_ALL_USERS);
  }, [isFocused]);

  React.useEffect(() => {
    socket.on(SOCKETS.CONNECT, () => {});
    socket.on(SOCKETS.DISCONNECT, () => {});

    return () => {
      socket.off(SOCKETS.CONNECT_ERROR);
    };
  }, []);

  const keyExtractor = React.useCallback((item) => {
    return get(item, "userID", "");
  }, []);

  const renderItem = ({ item }: any) => {
    const username = get(item, "username", "");
    const self = get(item, "self", false);
    return (
      <Button onPress={() => goToDetails({ item })} style={[styles.renderItem]}>
        <Text>
          {username} {self ? "(yourself)" : ""}
        </Text>
      </Button>
    );
  };

  return (
    <View>
      <Header>
        <Button disabled={indicator}>
          <Icon name={"chevron-left"} onPress={back} size={20} />
        </Button>
      </Header>
      <View style={[styles.flatListContainer]}>
        <FlatList
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={users}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 16,
  },
  renderItem: {
    padding: 16,
    minHeight: 40,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
});

export default HomeScreen;

import * as React from "react";
import { StyleSheet } from "react-native";
import Button from "../../components/button";
import Header from "../../components/header";
import Icon from "../../components/icon";
import View from "../../components/view";
import TextInput from "../../components/text-input";
import * as Routes from "../../constants/routes";
import useAuth from "../../hooks/useAuth";
import useCommon from "../../hooks/useCommon";
import socket from "../../utilties/socket";
import Text from "../../components/text";
import get from "lodash/get";
import SOCKETS from "../../constants/sockets";
import FlatList from "../../components/flat-list";
import { v4 } from "uuid";
import AdjustKeyboard from "../../components/adjust-keyboard";
import { useKeyboard } from "../../hooks/useKeyboard";
import isIOS from "../../utilties/isIOS";

const generatedID = v4();

const HomeDetailsScreen = ({ navigation, route }: any): JSX.Element => {
  const { state: authState }: any = useAuth();
  const { state: commonState, dispatch: commonDispatch }: any = useCommon();
  const username = get(authState, "username", "");
  const indicator = get(commonState, "indicator", false);
  const otherUserID = get(route, "params.item.userID", "");
  const otherUsername = get(route, "params.item.username", "");
  const isKeyboardVisible = useKeyboard();
  const hasIOS = isIOS();

  const [messages, setMessages] = React.useState<Array<any>>([]);
  const [message, setMessage] = React.useState<string>("");

  const onSubmitEditing = React.useCallback(() => {
    setMessages([
      ...messages,
      {
        content: message,
        from: username,
      },
    ]);
    socket.emit(SOCKETS.SEND_PRIVATE_MESSAGE, {
      message,
      to: otherUserID,
    });
    setMessage("");
  }, []);

  const onChangeText = React.useCallback(
    (_message) => setMessage(_message),
    []
  );

  React.useEffect(() => {
    socket.auth = { username };
    socket.connect();

    socket.on(SOCKETS.PRIVATE_MESSAGES, ({ content, from }: any) => {
      console.log(content)
      if (otherUserID === from) {
        setMessages([...messages, content]);
      }
    });
  }, [otherUserID]);

  const back = React.useCallback(() => {
    navigation.navigate(Routes.HOME_SCREEN.name);
  }, []);

  const keyExtractor = React.useCallback((_item, index) => {
    return generatedID + String(index);
  }, []);

  const renderItem = ({ item }: any) => {
    const username = get(item, "username", "");
    const self = get(item, "self", false);
    return (
      <View>
        <Text>
          {username} {self ? "(yourself)" : ""}
        </Text>
      </View>
    );
  };

  return (
    <AdjustKeyboard>
      <View style={[{ height: "100%" }]}>
        <Header
          left={
            <View>
              <Text style={[styles.headerText]}>{otherUsername}</Text>
            </View>
          }
        >
          <Button onPress={back} disabled={indicator}>
            <Icon name={"chevron-left"} onPress={back} size={20} />
          </Button>
        </Header>
        <FlatList
          style={[
            {
              flex: 1,
            },
          ]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          data={messages}
        />
        <TextInput
          value={message}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          style={[
            styles.textInput,
            {
              marginBottom: isKeyboardVisible ? 60 : 0,
            },
          ]}
        />
      </View>
    </AdjustKeyboard>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  sendMessageContainer: {
    position: "relative",
  },
  textInput: {
    padding: 16,
  },
});

export default HomeDetailsScreen;

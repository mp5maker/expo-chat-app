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

  const [messages, setMessages] = React.useState<Array<any>>([]);
  const [message, setMessage] = React.useState<string>("");

  const onSubmitEditing = () => {
    if (message && message.trim()) {
      setMessages([
        ...messages,
        {
          content: message,
          from: username,
        },
      ]);
      socket.emit(SOCKETS.SEND_PRIVATE_MESSAGE, {
        content: message,
        to: otherUserID,
      });
      setMessage("");
    }
  };

  const onChangeText = (_message: string) => setMessage(_message);

  React.useEffect(() => {
    socket.auth = { username };
    socket.connect();
  }, []);

  React.useEffect(() => {
    socket.on(SOCKETS.PRIVATE_MESSAGES, ({ content, from }: any) => {
      if (otherUserID === from) {
        setMessages([...messages, { content, from }]);
      }
    });
  }, [otherUserID, messages]);

  const back = React.useCallback(() => {
    navigation.navigate(Routes.HOME_SCREEN.name);
  }, []);

  const keyExtractor = (_item: any, index: number) => {
    return generatedID + String(index);
  };

  const renderItem = ({ item }: any) => {
    const content = get(item, "content", "");
    const isMe = get(item, "from", "") !== otherUserID;

    return (
      <View
        style={[
          styles.message,
          {
            borderColor: isMe ? "green" : "blue",
            backgroundColor: isMe ? "#14a37f" : "#0276aa",
            marginRight: isMe ? 4 : 16,
            marginLeft: isMe ? 16 : 4,
          },
        ]}
      >
        <Text style={[{ color: "white" }]}>{content}</Text>
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
          extraData={messages}
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
  message: {
    padding: 16,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginVertical: 8,
    borderRadius: 10,
  },
});

export default HomeDetailsScreen;

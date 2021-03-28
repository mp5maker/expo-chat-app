import * as React from "react";
import View from "../../components/view";
import Text from "../../components/text";
import useAuth from "../../hooks/useAuth";
import get from "lodash/get";
import socket from "../../utilties/socket";

const HomeScreen = (): JSX.Element => {
  const { state }: any = useAuth();
  const username = get(state, "username", "");

  React.useEffect(() => {
    socket.auth = { username };
    socket.connect();
    socket.emit("ALL_USERS");

    socket.on("ALL_USERS", (users: Array<any>) => {
      console.log("🚀 ~ file: index.tsx ~ line 18 ~ socket.on ~ args", users);
    });

    socket.onAny((event: any, ...args: any) => {
      // console.log(event, args);
    });

    return () => {
      socket.off("connect_error");
    };
  }, []);

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default HomeScreen;

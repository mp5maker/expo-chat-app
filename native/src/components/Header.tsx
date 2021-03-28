import * as React from "react";
import View from "./view";
import Text from "./text";
import { StyleSheet } from "react-native";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = ({ children }): JSX.Element => {
  return (
    <>
      <View style={[styles.container]}>
        <View>
          <Text style={[styles.headerText]}>Chat</Text>
        </View>
        <View>{children}</View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    minHeight: 40,
    paddingHorizontal: 16,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default Header;

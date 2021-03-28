import * as React from "react";
import View from "./view";
import Text from "./text";
import { StyleSheet } from "react-native";

interface IHeaderProps {
  left?: JSX.Element | JSX.Element[];
}

const Header: React.FC<IHeaderProps> = ({ left, children }): JSX.Element => {
  return (
    <>
      <View style={[styles.container]}>
        {left ? (
          left
        ) : (
          <View>
            <Text style={[styles.headerText]}>Chat</Text>
          </View>
        )}
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
    height: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default Header;

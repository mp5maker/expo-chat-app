import * as React from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  StyleProp,
  StyleSheet,
} from "react-native";
import isIOS from "../utilties/isIOS";

interface AdjustKeyboardInterfaceProps extends KeyboardAvoidingViewProps {
  style?: Array<StyleProp<any>>;
}

const AdjustKeyboard: React.FC<AdjustKeyboardInterfaceProps> = ({
  children,
  style,
}): JSX.Element => {
  const hasIOS = isIOS();

  return (
    <KeyboardAvoidingView
      style={[styles.fill, ...(style ? style : [])]}
      behavior={hasIOS ? "padding" : "height"}
    >
      <>{children}</>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default AdjustKeyboard;

import * as React from "react";
import { StyleProp, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BodyPropsInterface {
  children: any;
  style?: Array<StyleProp<any>>;
}

export const _Body = ({ children, style }: BodyPropsInterface): JSX.Element => {
  return (
    <SafeAreaView style={[...(style ? style : [])]}>
      <>
        <StatusBar />
        {children}
      </>
    </SafeAreaView>
  );
};

export const Body = React.memo(_Body);

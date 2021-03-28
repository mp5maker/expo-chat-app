import { Text as RNText, TextProps } from "react-native";
import * as React from "react";

interface ITextProps extends TextProps {}

export const Text: React.FC<ITextProps> = ({ ...otherProps }): JSX.Element => {
  const props = {
    ...otherProps,
  };

  return <RNText {...props} />;
};

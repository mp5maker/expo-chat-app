import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps,
} from "react-native";
import * as React from "react";

interface ITextInputProps extends TextInputProps {
  style?: Array<StyleProp<any>>;
}

const TextInput: React.FC<ITextInputProps> = ({
  style,
  ...otherProps
}): JSX.Element => {
  const props = {
    style: [
      {
        minHeight: 40,
        backgroundColor: "white",
      },
      ...(style ? style : []),
    ],
    ...otherProps,
  };

  return <RNTextInput {...props} />;
};

export default TextInput;

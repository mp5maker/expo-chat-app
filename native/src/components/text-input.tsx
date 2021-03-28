import { TextInput as RNTextInput, TextInputProps } from "react-native";
import * as React from 'react'

interface ITextInputProps extends TextInputProps {}

const TextInput: React.FC<ITextInputProps> = ({
  ...otherProps
}): JSX.Element => {
  const props = {
    ...otherProps,
  };

  return <RNTextInput {...props} />;
};

export default TextInput;
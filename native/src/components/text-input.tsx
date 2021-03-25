import { TextInput as RNTextInput, TextInputProps } from "react-native";

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
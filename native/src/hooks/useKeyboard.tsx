import * as React from "react";
import { Keyboard } from "react-native";

export const useKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = React.useState<boolean>(false);
  let keyboardShow: any = React.useRef(null).current;
  let keyboardHide: any = React.useRef(null).current;

  React.useEffect(() => {
    const onKeyboardDidShow = () => setKeyboardVisible(true);
    const onKeyboardDidHide = () => setKeyboardVisible(false);
    keyboardShow = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    keyboardHide = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  return keyboardVisible;
};

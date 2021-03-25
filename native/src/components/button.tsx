import { Pressable, PressableProps } from "react-native";

interface IButtonProps extends PressableProps {}

const Button: React.FC<IButtonProps> = ({ ...otherProps }): JSX.Element => {
  const props = {
    ...otherProps,
  };

  return (
    <>
      <Pressable {...props} />
    </>
  );
};

export default Button;

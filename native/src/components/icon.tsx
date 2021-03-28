import { FontAwesome5 } from "@expo/vector-icons";
import * as React from "react";

type TIconProps = Partial<React.ComponentProps<typeof FontAwesome5>> & {};

const Icon: React.FC<TIconProps> = ({ ...otherProps }: any): JSX.Element => {
  const props = {
    ...otherProps,
  };

  return <FontAwesome5 {...props} />;
};

export default Icon;

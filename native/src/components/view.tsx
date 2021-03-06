import { View as RNView, ViewProps } from "react-native";
import * as React from "react";

interface IViewProps extends ViewProps {}

const View: React.FC<IViewProps> = ({ ...otherProps }): JSX.Element => {
  const props = {
    ...otherProps,
  };

  return <RNView {...props} />;
};

export default View;

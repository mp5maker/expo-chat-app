import * as React from "react";
import { FlatList as RNFlatList, FlatListProps } from "react-native";

interface IFlatListProps extends FlatListProps<any> {}

const FlatList: React.FC<IFlatListProps> = ({
  ...otherProps
}: any): JSX.Element => {
  const props = {
    ...otherProps,
  };

  return <RNFlatList {...props} />;
};

export default FlatList;

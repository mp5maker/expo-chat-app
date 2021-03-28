import * as React from "react";
import { CommonContext } from "../contexts/common-context";

const useCommon = () => {
  const props = React.useContext(CommonContext);
  return props;
};

export default useCommon;

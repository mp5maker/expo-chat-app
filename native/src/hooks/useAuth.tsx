import * as React from "react";
import { AuthContext } from "../contexts/auth-context";

const useAuth = () => {
  const props = React.useContext(AuthContext);
  return props;
};

export default useAuth;

import * as React from "react";
import initialState from "../reducers/common/initial-state";
import reducer from "../reducers/common/reducer";

interface ICommonContextProps {
  state?: any;
  dispatch?: ((params: any) => any) | ((params: any) => void);
}

export const CommonContext = React.createContext<Partial<ICommonContextProps>>(
  {}
);

interface ICommonContextProviderProps {}
export const CommonContextProvider: React.FC<ICommonContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CommonContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <>{children}</>
    </CommonContext.Provider>
  );
};

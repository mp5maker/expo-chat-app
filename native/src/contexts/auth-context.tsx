import * as React from "react";
import initialState from '../reducers/auth/initial-state'
import reducer from '../reducers/auth/reducer'

interface IAuthContextProps {
  state?: any;
  dispatch?: ((params: any) => any) | ((params: any) => void);
}

export const AuthContext = React.createContext<Partial<IAuthContextProps>>({});

interface IAuthContextProviderProps {}
export const AuthContextProvider: React.FC<IAuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(initialState, reducer);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};

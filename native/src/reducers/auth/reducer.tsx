import * as Actions from "../../constants/actions";
import initialState from "../../reducers/auth/initial-state";

const reducer = (state = initialState, action: any) => {
  const { value } = action;

  switch (action.type) {
    case Actions.AUTH.CHANGE_USERNAME: {
      return {
        ...state,
        username: value,
      };
    }

    default:
      return state;
  }
};

export default reducer;

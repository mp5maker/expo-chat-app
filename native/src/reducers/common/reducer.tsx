import * as Actions from "../../constants/actions";
import initialState from "./initial-state";

const reducer = (state = initialState, action: any) => {
  const { value } = action;

  switch (action.type) {
    case Actions.COMMON.CHANGE_INDICATOR: {
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

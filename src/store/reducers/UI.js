import {
  NEW_ORDER_CREATED,
} from '../actions';

const INITIAL_STATE = {
  ordersScreen: {
    newOrder: null,
  },
};

const UI = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_ORDER_CREATED:
      return {
        ...state,
        ordersScreen: {newOrder: action.newOrder},
      };
    default:
      return state;
  }
};

export default UI;

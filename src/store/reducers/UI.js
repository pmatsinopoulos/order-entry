import {
  ORDER_CREATED,
} from '../actions';

const INITIAL_STATE = {
  ordersScreen: {
    newOrder: null,
  },
};

const UI = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDER_CREATED:
      return {
        ...state,
        ordersScreen: {newOrder: action.order},
      };
    default:
      return state;
  }
};

export default UI;

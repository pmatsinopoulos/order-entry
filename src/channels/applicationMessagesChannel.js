import {
  newOrderCreatedCreator,
} from '../store/actions';

const processIncomingMessage = ({dispatch, data}) => {
  console.debug('incoming message data', data);
  const {
    order,
  } = data;

  switch (data.type) {
    case 'NEW_ORDER_CREATED':
        dispatch(newOrderCreatedCreator(order));
      break;
    default:
      console.debug('Unknown message type received', data.type);
      break;
  }
};

export {processIncomingMessage};

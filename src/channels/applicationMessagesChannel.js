import {
  orderCreatedCreator,
} from '../store/actions';

const processIncomingMessage = ({dispatch, data}) => {
  console.debug('incoming message data', data);
  const {
    order,
  } = data;

  switch (data.type) {
    case 'ORDER_CREATED':
        dispatch(orderCreatedCreator(order));
      break;
    default:
      console.debug('Unknown message type received', data.type);
      break;
  }
};

export {processIncomingMessage};

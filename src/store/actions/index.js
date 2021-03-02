const NEW_ORDER_CREATED = 'NEW_ORDER_CREATED';

const newOrderCreatedCreator = newOrder => ({
  type: NEW_ORDER_CREATED,
  newOrder,
});

export {
  NEW_ORDER_CREATED,
  newOrderCreatedCreator,
};

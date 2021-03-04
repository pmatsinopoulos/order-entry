const ORDER_CREATED = 'ORDER_CREATED';

const orderCreatedCreator = order => ({
  type: ORDER_CREATED,
  order,
});

export {
  ORDER_CREATED,
  orderCreatedCreator,
};

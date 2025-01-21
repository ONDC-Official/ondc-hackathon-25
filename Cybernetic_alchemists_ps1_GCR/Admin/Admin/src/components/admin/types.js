import PropTypes from 'prop-types';

export const OrderPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
});

export const ProductPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
});

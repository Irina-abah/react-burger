import PropTypes from "prop-types";

const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
})

export default ingredientType;

export type TResetUser = {
  password: string,
  token: string
};

export type TItem = Readonly<{
  _id: string,
  name: string,
  price: number,
  image: string,
  type: "bun" | "main" | "sauce";
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  image_mobile: string,
  image_large: string
}>;
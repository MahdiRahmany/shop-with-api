import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemCart, selectIsInCart } from "../../store/slices/cart-slice";
import { useCallback } from "react";

const Card = ({ id, image, title, price }) => {
  const dispatch = useDispatch();

  const isInCart = useSelector((state) => selectIsInCart(state, id));

  const handleAddCart = useCallback(() => {
    dispatch(addItemCart({ id, image, title, price }));
  }, [dispatch, id, image, title, price]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4 w-64">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full rounded-md mb-4 object-contain"
        />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{price} USD</p>
      </Link>
      <div className="p-4">
        <button
          onClick={handleAddCart}
          disabled={isInCart}
          className={`w-full ${
            isInCart
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded transition-colors `}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Card;

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemCart, selectIsInCart } from "../../store/slices/cart-slice";
import { useCallback, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const Card = ({ id, image, title, price }) => {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const isInCart = useSelector((state) => selectIsInCart(state, id));

  const handleAddCart = useCallback(() => {
    dispatch(addItemCart({ id, image, title, price }));
  }, [dispatch, id, image, title, price]);

  const handleLike = () => {
    // handleAllList(data, like);
    setLike((like) => !like);
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-md p-4 m-4 w-64">
      <div className="flex justify-end">
        <button onClick={handleLike}>
          <AiFillHeart color={like ? "red" : "#E1D9D1"} fontSize="1.8rem" />
        </button>
      </div>

      <Link to={`/product/${id}`}>
        <div className="flex justify-center">
          <img
            src={image}
            alt={title}
            className="rounded-md mb-4 object-contain w-40 h-40"
          />
        </div>
        <h3 className="text-md font-semibold mb-2">{title}</h3>
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

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemCart, selectIsInCart } from "../../store/slices/cart-slice";
import { useCallback, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Divider } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarIcon from "@mui/icons-material/Star";
import { IoIosPricetags } from "react-icons/io";

const Card = ({ id, image, title, price, rate }) => {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const isInCart = useSelector((state) => selectIsInCart(state, id));

  const handleAddCart = useCallback(() => {
    dispatch(addItemCart({ id, image, title, price }));
  }, [dispatch, id, image, title, price]);

  const handleLike = () => {
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
        <h3 className="text-md font-semibold mb-2">
          <FormatListBulletedIcon /> {title}
        </h3>
        <div className="flex items-center justify-between text-yellow-500">
          <div className="flex items-center">
            <IoIosPricetags />
            <p className=" ml-1">{price} USD</p>
          </div>
          <div className="flex items-center">
            <StarIcon fontSize="small mr-1" />
            <p>{rate}</p>
          </div>
        </div>
      </Link>
      <div className="p-2">
        <Divider
          sx={{
            display: "flex",
            alignsItems: "center",
            justifyContent: "center",
            m: 1,
            width: "100%",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "primary.main",
          }}
        />
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

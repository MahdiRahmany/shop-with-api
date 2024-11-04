import { Link } from "react-router-dom";

const Card = ({ id, image, title, price, addToCart, isInCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4 w-64">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-40 rounded-md mb-4 object-contain"
        />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{price} USD</p>
      </Link>
      <div className="p-4">
        <button
          onClick={addToCart}
          disabled={isInCart}
          className={`w-full ${
            isInCart
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded transition-colors`}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Card;

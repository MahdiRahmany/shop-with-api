import { Link } from "react-router-dom";

const ProductList = ({ product }) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-xl">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-contain mb-4 rounded-md"
      />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-700 mb-2">Category: {product.category}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold mb-2">Price: {product.price} USD</p>
      <p className="text-gray-600 mb-4">
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </p>
      <Link to="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ProductList;

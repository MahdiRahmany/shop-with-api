import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/slices/products-slice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error.message}</p>;

  return (
    <div className="flex flex-wrap justify-center">
      {items.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-6 m-4 max-w-xs"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain mb-4 rounded-md"
          />
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-2">Category: {product.category}</p>
          <p className="text-lg font-semibold mb-2">
            Price: {product.price} USD
          </p>
          <Link to={`/product/${product.id}`}>
            <button className="bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-500">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearProduct, fetchProduct } from "../../store/slices/product-slice";
import Header from "../Header/Header";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const {
    data: product,
    loading,
    error,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [id, dispatch]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error.message}</p>;
  if (!product) return <p>هیچ داده‌ای موجود نیست.</p>;

  return (
    <>
      <Header cartItems={cartItems} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-xs">
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
          <p className="text-gray-700">{product.description}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

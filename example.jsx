import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/products-slice";
import Card from "../Card/Card";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "../../components/CardModal/CardModal";
import { addItemCart } from "./src/store/slices/cart-slice";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items: data,
    loading,
    error,
  } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const addToCart = (product) => {
    dispatch(addItemCart(product));
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <div>
      <header className="fixed top-0 right-0 w-full flex justify-between items-center p-4 bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Logo Shop</h1>
        <div className="flex items-center gap-2">
          <span className="bg-white text-blue-500 rounded-full px-2 py-1">
            {cartItems.length}
          </span>
          <FaShoppingCart
            className="text-3xl cursor-pointer"
            onClick={toggleModal}
          />
        </div>
      </header>
      <h1 className="mt-24 text-3xl font-bold text-center my-8">
        Welcome to the Store Shop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {data.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            addToCart={() => addToCart(item)}
            isInCart={isProductInCart(item.id)}
          />
        ))}
      </div>
      {isModalOpen && <CartModal cartItems={cartItems} onClose={toggleModal} />}
    </div>
  );
};

export default Home;

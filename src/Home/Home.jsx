import { useEffect, useState } from "react";
import useShopData from "../hooks/useShopData";
import Card from "../Card/Card";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "../CardModal/CardModal";

const Home = () => {
  const { data, loading, error } = useShopData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.find(
        (item) => item.id === product.id
      );

      if (existingItemIndex) {
        return prevItems;
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = newQuantity;
      return newItems;
    });
  };

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Logo Shop</h1>
        <div className="flex items-center gap-2">
          <span className="bg-white text-blue-500 rounded-full px-2 py-1">
            {totalItems}
          </span>
          <FaShoppingCart
            className="text-3xl cursor-pointer"
            onClick={toggleModal}
          />
        </div>
      </header>
      <h1 className="text-3xl font-bold text-center my-8">
        Welcome to the Store Shop
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {data?.map((item) => (
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
      {isModalOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={toggleModal}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      )}
    </div>
  );
};

export default Home;

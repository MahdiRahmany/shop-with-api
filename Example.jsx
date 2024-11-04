// Home.js
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
      // چک می‌کنیم آیا محصول قبلاً در سبد خرید وجود دارد
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // اگر محصول قبلاً در سبد خرید بود، فقط تعداد آن را افزایش می‌دهیم
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // اگر محصول در سبد خرید نبود، آن را اضافه می‌کنیم
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].quantity = newQuantity;
      return newItems;
    });
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Calculate total items safely
  const totalItems = cartItems && cartItems.length > 0
    ? cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    : 0;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center p-4">
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
      {isModalOpen && cartItems && (
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

// Card.js (این کامپوننت رو هم باید بروزرسانی کنید)
const Card = ({ id, image, title, price, addToCart, isInCart }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          Price: ${price}
        </p>
        <button
          onClick={addToCart}
          disabled={isInCart}
          className={`mt-4 ${
            isInCart
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded`}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Card;


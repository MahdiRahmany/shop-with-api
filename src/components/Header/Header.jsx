import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "../CardModal/CardModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <>
      <header className="fixed top-0 right-0 w-full flex justify-between items-center p-4 bg-blue-500 text-white">
        <Link to="/" className="text-3xl font-bold">
          Shop Logo
        </Link>
        <div className="flex items-center gap-2">
          <span className="bg-white text-blue-500 rounded-full px-2 py-1">
            {totalItems}
          </span>
          <FaShoppingCart
            className="text-3xl cursor-pointer transition-transform transform hover:scale-110"
            onClick={toggleModal}
          />
        </div>
      </header>
      {modalOpen && <CartModal cartItems={cartItems} onClose={toggleModal} />}
    </>
  );
};

export default Header;

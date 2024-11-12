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
      <header className="sticky z-10 top-0 right-0 w-full backdrop-blur transition-colors duration-500 rounded-b-xl text-zinc-800 border-inherit flex justify-between items-center p-4 shadow-2xl">
        <Link to="/" className="text-3xl font-bold">
          Shop Logo
        </Link>          
          <div
            className="relative flex items-center gap-2 cursor-pointer hover:scale-110 transition-transform transform duration-300 right-3"
            onClick={toggleModal}
          >
            <FaShoppingCart className=" text-3xl"></FaShoppingCart>
            {totalItems > 0 && (
              <span className="text-center -top-3 -right-4  text-white bg-zinc-500 rounded-full w-6 h-6 absolute">
                {totalItems}
              </span>
            )}
          </div>
      </header>
      {modalOpen && <CartModal cartItems={cartItems} onClose={toggleModal} />}
    </>
  );
};

export default Header;

import { useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import CartModal from "../CardModal/CardModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountMenu from "../Dropdown/Dropdown";
import ThemeToggle from "../DarkMode/DarkMode";

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
        <div className="flex min-w-36 justify-between items-center">
          <div
            className="relative flex items-center cursor-pointer hover:scale-110 transition-transform transform duration-300"
            onClick={toggleModal}
          >
            <LuShoppingCart
              className=" text-3xl"
              style={{
                color: "#94a3b8",
              }}
            />
            {totalItems > 0 && (
              <span className="text-center -top-1 -right-3  text-white bg-zinc-500 rounded-full w-6 h-6 absolute">
                {totalItems}
              </span>
            )}
          </div>
          <AccountMenu />
          <ThemeToggle />
        </div>
      </header>
      {modalOpen && <CartModal cartItems={cartItems} onClose={toggleModal} />}
    </>
  );
};

export default Header;

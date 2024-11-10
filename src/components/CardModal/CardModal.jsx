import { useDispatch, useSelector } from "react-redux";
import {
  decrementItemQuantity,
  incrementItemQuantity,
  removeItemCart,
} from "../../store/slices/cart-slice";

const CartModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4">Your Cart {totalItems} items</h2>
        {cartItems.length > 0 ? (
          <ul className="max-h-[calc(100vh-11rem)] overflow-y-auto">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="mb-2 border-b pb-2 flex justify-between item-center gap-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semi-bold">{item.title}</h3>
                    <p className="text-gray-700">
                      $ {(item.price * (item.quantity || 1)).toFixed(2)}
                      <span className="text-sm text-gray-700">
                        &nbsp;({item.price} each)
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => dispatch(removeItemCart(item.id))}
                >
                  Remove
                </button>
                <div className="bg-slate-600 flex items-center rounded py-1">
                  <button
                    className="px-3 py-1 text-xl font-bold text-blue-600 hover:text-blue-800"
                    onClick={() => dispatch(incrementItemQuantity(item.id))}
                  >
                    +
                  </button>
                  <span className="text-xl font-bold w-8 text-center">
                    {item.quantity || 1}
                  </span>
                  <button
                    className="px-3 py-1 text-xl font-bold text-blue-600  hover:text-blue-800"
                    onClick={() => dispatch(decrementItemQuantity(item.id))}
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 mb-4">No items in the cart yet.</p>
        )}
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            onClick={onClose}
          >
            Close
          </button>
          <div className="text-white bg-blue-500 px-4 py-2 rounded ">
            <p className="font-semibold">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
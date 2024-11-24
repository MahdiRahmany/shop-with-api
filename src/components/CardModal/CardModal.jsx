import { useDispatch, useSelector } from "react-redux";
import {
  decrementItemQuantity,
  incrementItemQuantity,
  removeItemCart,
  selectTotalItems,
  selectTotalPrice,
} from "../../store/slices/cart-slice";
import { useCallback } from "react";

const CartModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  const handleIncrement = useCallback(
    (id) => dispatch(incrementItemQuantity(id)),
    [dispatch]
  );

  const handleDecrement = useCallback(
    (id) => dispatch(decrementItemQuantity(id)),
    [dispatch]
  );

  const handleRemove = useCallback(
    (id) => dispatch(removeItemCart(id)),
    [dispatch]
  );

  return (
    <div
      id="modal-background"
      onClick={onClose}
      className="fixed z-10 inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full"
      >
        <h2 className="text-xl font-bold mb-4">Your Cart {totalItems} items</h2>
        {cartItems.length > 0 ? (
          <ul className="max-h-[calc(100vh-11rem)] overflow-y-auto">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="mb-2 border-b pb-2 flex justify-between items-center"
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
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                      <span className="text-sm text-gray-600">
                        &nbsp;({item.price} each)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                  <div className="flex items-center bg-slate-200 rounded">
                    <button
                      className="px-2 py-1 text-xl font-bold text-blue-600 hover:text-blue-800"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                    <span className="text-lg font-bold px-3">
                      {item.quantity || 1}
                    </span>
                    <button
                      className="px-2 py-1 text-xl font-bold text-blue-600  hover:text-blue-800"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </button>
                  </div>
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

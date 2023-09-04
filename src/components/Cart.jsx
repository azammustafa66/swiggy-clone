import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BiTrashAlt } from "react-icons/bi";
import { useEffect } from "react";

import {
  addItem,
  clearCart,
  removeItem,
  decreaseQuantity,
  increaseQuantity,
} from "../utils/cartSlice";
import { IMG_URL, NON_VEG_IMG_URL, VEG_IMG_URL } from "../utils/url";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  console.log(cartItems);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice =
        (item.card.info.price || item.card.info.defaultPrice) / 100;
      const itemTotal = itemPrice * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      storedCart.forEach((item) => {
        dispatch(addItem(item));
      });
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div>
        <h1 className="text-2xl font-bold">Cart Items</h1>
      </div>
      <div>
        <StyledButton onClick={handleClearCart}>Clear Cart</StyledButton>
      </div>
      <div className="w-1/2 mx-auto text-center gap-4 flex flex-col justify-evenly">
        {cartItems.length === 0 ? (
          <h1 className="text-xl font-medium">
            Your cart feels light, please add something
          </h1>
        ) : (
          cartItems?.map((item) => (
            <div
              key={item.card.info.id}
              className="flex items-center justify-evenly gap-4"
            >
              <div>
                {item.card.info.itemAttribute.vegClassifier === "NONVEG" ? (
                  <img
                    width={25}
                    height={25}
                    src={NON_VEG_IMG_URL}
                    alt="non-vegetarian-food-symbol"
                  />
                ) : (
                  <img
                    width={25}
                    height={25}
                    src={VEG_IMG_URL}
                    alt="vegetarian-food-symbol"
                  />
                )}
              </div>
              <div className="w-1/3">
                <h1>{item.card.info.name}</h1>
                <h3>
                  ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}
                </h3>
              </div>
              <div>
                <img
                  src={IMG_URL + item.card.info.imageId}
                  alt="product-image"
                  width={118}
                  height={100}
                  className="rounded-md"
                />
                <div className="flex gap-2 cursor-pointer">
                  <CartItemButton
                    onClick={() => handleDecreaseQuantity(item.card.info.id)}
                  >
                    -
                  </CartItemButton>
                  <span className="mt-1">{item.quantity}</span>
                  <CartItemButton
                    onClick={() => handleIncreaseQuantity(item.card.info.id)}
                  >
                    +
                  </CartItemButton>
                  <BiTrashAlt
                    onClick={() => handleRemoveItem(item.card.info.id)}
                    size={20}
                    cursor={"pointer"}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="text-right">
          <h1>Total: {calculateTotalPrice()}</h1>
        </div>
      )}
    </div>
  );
};

export default Cart;

const StyledButton = styled.button`
  background-color: orange;
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
`;

const CartItemButton = styled.button`
  font-size: 20px;
  font-weight: 600;
  padding: 2px;
  cursor: pointer;
`;

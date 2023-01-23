import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isOrderFail, setIsOrderFail] = useState(null);
  const hasItems = cartCtx.items.length > 0;

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const addToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onConfirmHandler = async (userData) => {
    // console.log(userData);
    try {
      setIsSubmitting(true);
      const response = await fetch(
        "https://react-food-odering-app-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            userData: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong! Your order is not submitted. Please try again."
        );
      }
      setDidSubmit(true);
      setIsSubmitting(false);
      cartCtx.clearCart();
    } catch (err) {
      setIsOrderFail(err.message);
      setIsSubmitting(false);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeFromCartHandler.bind(null, item.id)}
          onAdd={addToCartHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkOutFormHandler = () => {
    setOrderConfirm(true);
  };

  const onFailureBttnHandler = () => {
    setIsOrderFail(false);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkOutFormHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderConfirm && (
        <Checkout onClick={props.onClose} onConfirm={onConfirmHandler} />
      )}
      {!orderConfirm && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Placing your order...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const orderFailContent = (
    <React.Fragment>
      <p className={classes["text-error"]}>{isOrderFail}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onFailureBttnHandler}>
          Okay
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {isOrderFail && !isSubmitting && orderFailContent}
    </Modal>
  );
};

export default Cart;

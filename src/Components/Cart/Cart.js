import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import {BsFillCheckCircleFill} from 'react-icons/bs';

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderClickHandler = () => {
    setIsCheckout(true);
  };

  const cancelOrder = () => {
    setIsCheckout(false);
  };

  const submitOrderHandler = async (submittedData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-6f5a4-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: submittedData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearItems();
  };

  const Buttons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHide}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={addCartItemHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const cardModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm
          onSubmitOrder={submitOrderHandler}
          onCancelOrder={cancelOrder}
        />
      )}
      {!isCheckout && Buttons}
    </React.Fragment>
  );

  const isSubmittingContent = <p>Sending order data...</p>;

  const didSubmitted = <div className={classes.check}>
    <BsFillCheckCircleFill style={{fontSize: "4rem"}} />
      <button className={classes.newOrder} onClick={props.onHide}>
        New Order?
      </button>
    </div>

  return <Modal onHide={props.onHide}>
    {!isSubmitting && !didSubmit && cardModalContent}
    {isSubmitting && isSubmittingContent}
    { !isSubmitting && didSubmit && didSubmitted}
  </Modal>;
};

export default Cart;

import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCardButton.module.css";
import CardIcon from "../Cart/CardIcon";
import CartContext from "../../Store/cart-context";

const HeaderCardButton = (props) => {
  const [btnAnimate, setBtnAnimate] = useState(false);

  const itemsContext = useContext(CartContext);
  const { items } = itemsContext;
  const numberOfItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const headerBtnClasses = `${classes.button} ${
    btnAnimate ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnAnimate(true);

    const timer = setTimeout(() => {
      setBtnAnimate(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={headerBtnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CardIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCardButton;

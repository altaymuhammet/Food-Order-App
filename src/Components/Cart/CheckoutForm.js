import React, { useRef, useState } from "react";
import classes from "./CheckoutForm.module.css";

const isValid = (value) => value.trim() === "";
const isFiveDigits = (value) => value.trim().length === 5;

const CheckoutForm = (props) => {
const [formValidation, setFormValidation] = useState({
  name: true,
  street: true,
  city: true,
  postalCode: true,
})

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isValid(enteredName);
    const enteredStreetIsValid = !isValid(enteredStreet);
    const enteredCityIsValid = !isValid(enteredCity);
    const enteredPostalCodeIsValid = isFiveDigits(enteredPostalCode);

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

      setFormValidation({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
      })

      if(!formIsValid) {
        return;
      }

      props.onSubmitOrder({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostalCode
      })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidation.name && <p style={{color: "red", fontWeight: "bold"}}>Please enter a valid name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidation.street && <p style={{color: "red", fontWeight: "bold"}}>Please enter a valid street!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formValidation.postalCode && <p style={{color: "red", fontWeight: "bold"}}>Please enter a valid Postal code!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidation.city && <p style={{color: "red", fontWeight: "bold"}}>Please enter a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancelOrder}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;

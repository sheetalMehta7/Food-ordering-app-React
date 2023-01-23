import useInput from "../../Hooks/use-input";
import Card from "../UI/Card";
import classes from "./Checkout.module.css";

const OrderForm = (props) => {
  const {
    value: enteredName,
    inputIsValid: nameIsValid,
    hasError: nameIsInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHanlder: nameBlurHandler,
    reset: nameReset,
  } = useInput((data) => data.trim().length > 5);

  const {
    value: enteredAdd,
    inputIsValid: addIsValid,
    hasError: addIsInvalid,
    inputChangeHandler: addChangeHandler,
    inputBlurHanlder: addBlurHandler,
    reset: addReset,
  } = useInput((data) => data.trim().length > 20);

  const {
    value: enteredEmail,
    inputIsValid: emailIsValid,
    hasError: emailIsInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHanlder: emailBlurHandler,
    reset: emailReset,
  } = useInput((data) => data.includes("@"));

  const {
    value: enteredMobNo,
    inputIsValid: mobNoIsValid,
    hasError: mobNoIsInvalid,
    inputChangeHandler: mobNoChangeHandler,
    inputBlurHanlder: mobNoBlurHandler,
    reset: mobNoReset,
  } = useInput((data) => data.trim().length === 10);

  const formIsValid = nameIsValid && emailIsValid && addIsValid && mobNoIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const userData = {
      userName: enteredName,
      userAdd: enteredAdd,
      userEmail: enteredEmail,
      userMobNo: enteredMobNo,
    };
    // console.log(userData);

    props.onConfirm(userData);

    console.log("hi");
    nameReset();
    emailReset();
    addReset();
    mobNoReset();
  };

  const nameInputClasses = nameIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const emailInputClasses = emailIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const addInputClasses = addIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const mobNoInputClasses = mobNoIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const ConfirmBttn = !formIsValid
    ? `${classes.disabled}`
    : `${classes.submit}`;

  return (
    <Card>
      <form onSubmit={formSubmitHandler} className={classes["control-group"]}>
        <div className={nameInputClasses}>
          <label htmlFor="text">Enter your name:</label>
          <input
            id="text"
            type="text"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameIsInvalid && (
            <p className={classes["error-text"]}>Enter valid name.</p>
          )}
        </div>
        <div className={addInputClasses}>
          <label htmlFor="text">Enter your Address:</label>
          <input
            id="text"
            type="text"
            onChange={addChangeHandler}
            onBlur={addBlurHandler}
            value={enteredAdd}
          />
          {addIsInvalid && (
            <p className={classes["error-text"]}>
              Enter valid shipping address.
            </p>
          )}
        </div>
        <div className={mobNoInputClasses}>
          <label htmlFor="tel">Enter your mobile no:</label>
          <input
            id="tel"
            type="tel"
            onChange={mobNoChangeHandler}
            onBlur={mobNoBlurHandler}
            value={enteredMobNo}
          />
          {mobNoIsInvalid && (
            <p className={classes["error-text"]}>Enter valid mobile number.</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="email">Enter your email:</label>
          <input
            id="email"
            type="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailIsInvalid && (
            <p className={classes["error-text"]}>Enter valid email address.</p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClick}>
            Cancel
          </button>
          <button className={ConfirmBttn}>Confirm Order</button>
        </div>
      </form>
    </Card>
  );
};

export default OrderForm;

import { useReducer } from "react";

const defaultState = {
  enteredInput: "",
  inputTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { enteredInput: action.value, inputTouched: state.inputTouched };
  }
  if (action.type === "BLUR") {
    return { enteredInput: state.enteredInput, inputTouched: action.value };
  }
  if (action.type === "RESET") {
    return defaultState;
  }
  return defaultState;
};

const useInput = (validity) => {
  const [inputState, inputDispatch] = useReducer(inputReducer, defaultState);

  const inputChangeHandler = (event) => {
    inputDispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHanlder = () => {
    inputDispatch({ type: "BLUR", value: true });
  };

  const inputIsValid = validity(inputState.enteredInput);
  const hasError = !inputIsValid && inputState.inputTouched;

  const reset = () => {
    inputDispatch({ type: "RESET" });
  };

  return {
    value: inputState.enteredInput,
    inputIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHanlder,
    reset,
  };
};

export default useInput;

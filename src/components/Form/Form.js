import React, { useState } from "react";

import classes from "./Form.module.scss";
import { AiFillLock } from "react-icons/ai";

const initialInputs = {
  username: "",
  email: "",
  password: "",
};

const isErrorsEqual = (obj1, obj2) => {
  return (
    obj1.username === obj2.username &&
    obj1.email === obj2.email &&
    obj1.password === obj2.password
  );
};

const errorCheck = (inputs) => {
  const errors = { ...initialInputs };
  // username check
  if (inputs.username.length === 0) {
    errors.username = "Enter a username";
  } else if (inputs.username.includes(" ")) {
    errors.username = "Username must not contain spaces";
  }
  // email check
  if (inputs.email) {
    if (inputs.email.length === 0) {
      errors.email = "Enter an email";
    } else if (!inputs.email.includes("@")) {
      errors.email = "Enter a valid email";
    }
  }
  // password check
  if (inputs.password.length === 0) {
    errors.password = "Enter a password";
  } else if (inputs.password.length < 7) {
    errors.password = "Enter a longer password";
  }
  return errors;
};

const Form = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [inputs, setInputs] = useState(initialInputs);
  const [inputsErrors, setInputsErrors] = useState(initialInputs);
  const [message, setMessage] = useState(null);

  const reset = () => {
    setInputs(initialInputs);
    setInputsErrors(initialInputs);
  };

  const isSignInHandler = () => {
    reset();
    setMessage(null);
    setIsSignIn((p) => !p);
  };

  const inputChangeHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (inputsErrors[id].length !== 0) {
      setInputsErrors((p) => {
        const jawn = { ...p };
        jawn[id] = "";
        return jawn;
      });
    }

    setInputs((p) => {
      const jawn = { ...p };
      jawn[id] = value;
      return jawn;
    });
  };

  const inputBlurHandler = (e) => {
    const id = e.target.id;
    const errors = errorCheck(inputs);
    if (!isErrorsEqual(errors, initialInputs)) {
      setInputsErrors((p) => {
        const jawn = { ...p };
        jawn[id] = errors[id];
        return jawn;
      });
      return;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const errors = errorCheck(inputs);
    if (!isErrorsEqual(errors, initialInputs)) {
      setInputsErrors(errors);
      return;
    }

    if (isSignIn) {
      setMessage("You have been signed in.");
    } else {
      setMessage("Your account has been created.");
    }
    reset();
  };

  const errorMsg = (msg) => {
    return <p className={classes.error}>{msg}</p>;
  };

  return (
    <div className={classes.container}>
      <form
        className={classes.form}
        onSubmit={submitHandler}
        noValidate
        autoComplete="off"
      >
        <h2 className={classes.form__title}>
          {!isSignIn && <>Create an Account</>}
          {isSignIn && <>Sign In</>}
        </h2>
        <p className={classes.form__description}>
          One account. All access. Always free.
        </p>
        <div className={classes.form__control}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={inputs.username}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
          {inputsErrors.username && errorMsg(inputsErrors.username)}
        </div>
        {!isSignIn && (
          <div className={classes.form__control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={inputs.email}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
            />
            {inputsErrors.email && errorMsg(inputsErrors.email)}
          </div>
        )}
        <div className={classes.form__control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={inputs.password}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
          {inputsErrors.password && errorMsg(inputsErrors.password)}
        </div>
        <button className={classes.form__button}>
          {!isSignIn && (
            <>
              <AiFillLock className={classes.form__button__icon} />
              Create Account
            </>
          )}
          {isSignIn && <>Sign In</>}
        </button>
        <span className={classes.form__switch}>
          {!isSignIn && (
            <>
              Already have an account?{" "}
              <button onClick={isSignInHandler}>Sign In</button>
            </>
          )}
          {isSignIn && (
            <>
              Don't have an account?{" "}
              <button onClick={isSignInHandler}>Create Account</button>
            </>
          )}
        </span>
      </form>
      {message && <p className={classes.message}>{message}</p>}
    </div>
  );
};

export default Form;

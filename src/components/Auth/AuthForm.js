import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { signIn, signUp } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForm.module.css";
import { authActions } from "../../store/auth-slice";

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, callApi } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailRef = useRef();
  const pwdRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const pwd = pwdRef.current.value;

    if (isLogin) {
      callApi(signIn.bind(null, email, pwd)).then((response) => {
        if (response) {
          dispatch(
            authActions.login({
              token: response.idToken,
              expiresIn: +response.expiresIn,
            })
          );
          navigate("/", { replace: true });
        } else {
          props.errorHandler(error);
        }
      });
    } else {
      callApi(signUp.bind(null, email, pwd)).then((response) => {
        if (response) {
          setIsLogin(true);
          navigate("/auth", { replace: true });
        } else {
          props.errorHandler(error);
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={pwdRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <LoadingSpinner />}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

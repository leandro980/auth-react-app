import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../lib/api";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPwdRef = useRef();
  const navigate = useNavigate();
  const { isLoading, error, callApi } = useHttp();
  const token = useSelector((state) => state.auth.token);

  const submitHandler = (e) => {
    e.preventDefault();

    const password = newPwdRef.current.value;

    // Validazione
    callApi(changePassword.bind(null, token, password)).then((response) => {
      if (!error) {
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          minLength="7"
          type="password"
          id="new-password"
          ref={newPwdRef}
        />
      </div>
      <div className={classes.action}>
        {!isLoading && <button>Change Password</button>}
        {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
};

export default ProfileForm;

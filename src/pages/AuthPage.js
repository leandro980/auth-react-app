import { Fragment, useState } from "react";
import AuthForm from "../components/Auth/AuthForm";

const AuthPage = () => {
  const [error, setError] = useState(null);

  const errorHandler = (errorMsg) => {
    setError(errorMsg);
  };
  return (
    <Fragment>
      {error && <div className="error">{error}</div>}
      <AuthForm errorHandler={errorHandler} />
    </Fragment>
  );
};

export default AuthPage;

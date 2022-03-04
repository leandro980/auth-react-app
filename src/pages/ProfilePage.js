import UserProfile from "../components/Profile/UserProfile";
import { Fragment, useState } from "react";

const ProfilePage = () => {
  const [error, setError] = useState(null);

  const errorHandler = (errorMsg) => {
    setError(errorMsg);
  };

  return (
    <Fragment>
      {error && <div className="error">{error}</div>}
      <UserProfile errorHandler={errorHandler} />
    </Fragment>
  );
};

export default ProfilePage;

import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

const UserProfile = (props) => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm errorHandler={props.errorHandler} />
    </section>
  );
};

export default UserProfile;

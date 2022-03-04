import React, { Suspense, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import HomePage from "./pages/HomePage";
import { authActions } from "./store/auth-slice";

const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

let timeoutId;

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const duration = useSelector((state) => state.auth.duration);
  const dispatch = useDispatch();
  const { logout, setTimeoutId } = authActions;

  const stopTimeout = useCallback(() => {
    dispatch(logout());
  }, [logout]);

  useEffect(() => {
    if (duration) {
      const timeoutId = setTimeout(stopTimeout, duration);
      dispatch(setTimeoutId(timeoutId));
    }
  }, [duration, stopTimeout, setTimeoutId]);
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <ProfilePage />
              ) : (
                <Navigate to="/auth" replace={true} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

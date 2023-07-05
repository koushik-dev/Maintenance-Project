import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { logOut } from "./firebase";
import { useAuth } from "./hooks";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated, removeUser } = useAuth();

  // TODO: Persist login on page refresh

  const logUserOut = () => {
    logOut().then(() => {
      removeUser();
      navigate("/login");
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <button onClick={logUserOut}>logout</button>
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" state={{ from: "location" }} replace />
      )}
    </>
  );
};

export default PrivateRoute;

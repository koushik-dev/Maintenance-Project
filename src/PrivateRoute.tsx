import { Outlet, Navigate } from "react-router-dom";
import { Layout } from "./components";
import { useAuth } from "./hooks";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Navigate to="/login" state={{ from: "location" }} replace />
      )}
    </>
  );
};

export default PrivateRoute;

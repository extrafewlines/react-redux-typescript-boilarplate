import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store';

export const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);
  const location = useLocation();

  if (auth?.isLoggedIn && user) {
    return <Outlet />;
  }

  return <Navigate to="/auth/signin" state={{ from: location }} replace />;
};

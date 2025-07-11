import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

export default function ProtectedRoute({ children }) {
  const isAuth = !!getCookie('token');
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

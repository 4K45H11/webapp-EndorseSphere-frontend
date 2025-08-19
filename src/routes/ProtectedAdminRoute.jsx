import { Navigate } from 'react-router-dom';

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role === 'admin') {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedAdminRoute;


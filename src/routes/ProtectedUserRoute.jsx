import { Navigate } from 'react-router-dom';

function ProtectedUserRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role === 'user') {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}
export default ProtectedUserRoute;

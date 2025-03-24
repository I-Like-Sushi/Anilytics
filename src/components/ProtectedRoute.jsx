import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/logIn" replace />;
    }

    return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

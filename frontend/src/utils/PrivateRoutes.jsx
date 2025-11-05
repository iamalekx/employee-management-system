import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    
    if(loading) {
        return (
            <span className="flex justify-self-center w-15  loading min-h-200 loading-spinner loading-xl"></span>
        );
    }

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoutes
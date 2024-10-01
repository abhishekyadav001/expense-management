import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../Redux/store"; // Assuming you have a RootState type

interface PrivateRouteProps {
    children: ReactNode; // ReactNode to accept any valid JSX element as children
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { token } = useSelector((store: RootState) => store.auth); // Type the store with RootState

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;

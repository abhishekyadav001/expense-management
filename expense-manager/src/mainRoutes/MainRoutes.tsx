import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateRoute from "../Components/PrivateRoute";
import Profile from "../Pages/Profile";
import Home from "../Pages/Home";
import Transaction from "../Pages/Transaction";
import Accounts from "../Pages/Accounts";

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/transaction"
        element={
          <PrivateRoute>
            <Transaction />
          </PrivateRoute>
        }
      />
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <Accounts />
          </PrivateRoute>
        }
      />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default MainRoutes;

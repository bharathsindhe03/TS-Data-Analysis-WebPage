import Loader from "./Components/Loader";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";

import { useAuth } from "./Uitls/AuthChecker";

import Login from "./Pages/Login";
const Register = lazy(() => import("./Pages/Register"));
const Home = lazy(() => import("./Pages/Home"));

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

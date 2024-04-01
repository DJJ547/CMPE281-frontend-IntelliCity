import React from "react";
import { Routes, Route } from "react-router-dom";
// ... other imports
import "./index.css";

//utilities
// import ProtectedRoute from "./utilitiies/ProtectedRoute";

//components
import PageLayout from "./components/pageLayout/PageLayout";

//pages
import Test from "./pages/Test";
// import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import CameraManager from "./pages/CameraManager";
import IotManager from "./pages/IotManager";
import DroneManager from "./pages/DroneManager";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

export default function App() {
  return (
    <div>
      <Routes>
        <>
          <Route path="/test" element={<PageLayout><Test /></PageLayout>} />
        </>

        <Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          {/* <Route path="/" element={<Navigate to="/auth/login" replace />} /> */}
        </Route>

        <Route>
          {/* <Route path="/dashboard" element={<ProtectedRoute><PageLayout><Dashboard /></PageLayout></ProtectedRoute>} /> */}
          <Route path="/" element={<PageLayout><Dashboard /></PageLayout>} />
          <Route path="/camera" element={<PageLayout><CameraManager /></PageLayout>} />
          <Route path="/iot" element={<PageLayout><IotManager /></PageLayout>} />
          <Route path="/drone" element={<PageLayout><DroneManager /></PageLayout>} />
        </Route>
      </Routes>
    </div>
  );
}

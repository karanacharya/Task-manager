import React from "react";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      {/* <TaskProvider> */}
        <Navbar />
        <Outlet />
      {/* </TaskProvider> */}
    </AuthProvider>
  );
}

export default App;

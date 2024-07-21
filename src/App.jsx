import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./layout/Login/Login";
import Register from "./layout/Register/Register";
import Select from "./layout/Select/Select";
import Setting from "./layout/Setti/Setting";
import History from "./layout/Histo/History";
import ProtectRoutes from "./utils/ProtectedRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectRoutes />}>
          <Route path="/select" element={<Select />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

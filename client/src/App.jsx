import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import LostItems from "./pages/LostItems/LostItems";
import ReportLostItem from "./pages/LostItems/ReportLostItem";
import EditLostItem from "./pages/LostItems/EditLostItem";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lost-items"
        element={
          <ProtectedRoute>
            <LostItems />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lost-items/create"
        element={
          <ProtectedRoute>
            <ReportLostItem />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lost-items/edit/:id"
        element={
          <ProtectedRoute>
            <EditLostItem />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
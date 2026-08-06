import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

// Lost Items
import LostItems from "./pages/LostItems/LostItems";
import ReportLostItem from "./pages/LostItems/ReportLostItem";
import EditLostItem from "./pages/LostItems/EditLostItem";

// Found Items
import FoundItems from "./pages/FoundItems/FoundItems";
import ReportFoundItem from "./pages/FoundItems/ReportFoundItem";
import EditFoundItem from "./pages/FoundItems/EditFoundItem";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Lost Items */}
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

      {/* Found Items */}
      <Route
        path="/found-items"
        element={
          <ProtectedRoute>
            <FoundItems />
          </ProtectedRoute>
        }
      />

      <Route
        path="/found-items/create"
        element={
          <ProtectedRoute>
            <ReportFoundItem />
          </ProtectedRoute>
        }
      />

      <Route
        path="/found-items/edit/:id"
        element={
          <ProtectedRoute>
            <EditFoundItem />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
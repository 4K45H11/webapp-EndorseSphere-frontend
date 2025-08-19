import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard"
import SubmitContent from "./pages/SubmitContent";
import Approvals from "./pages/Approvals";
import ProtectedAdminRoute from './routes/ProtectedAdminRoute'
import ProtectedUserRoute from "./routes/ProtectedUserRoute";
import Navbar from "./components/Navbar";
import Analytics from "./pages/Analytics";
import Feed from "./pages/Feed";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <Dashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/user/dashboard"
            element={
              <ProtectedUserRoute>
                <UserDashboard />
              </ProtectedUserRoute>
            }
          />
          <Route path="/submit" element={
            <ProtectedUserRoute>
              <SubmitContent />
            </ProtectedUserRoute>
          } />
          <Route path="/approvals" element={
            <ProtectedAdminRoute>
              <Approvals />
            </ProtectedAdminRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedAdminRoute>
              <Analytics/>
            </ProtectedAdminRoute>
          } />
          <Route path="/feed" element={
            <ProtectedAdminRoute>
              <Feed/>
            </ProtectedAdminRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

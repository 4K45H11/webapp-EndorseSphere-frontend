import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaCheckCircle,
  FaNewspaper,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="font-bold text-lg">Content Platform (Admin)</h1>

        <div className="hidden md:flex gap-4">
          <Link to="/admin/dashboard" className="flex items-center gap-1 hover:text-gray-200">
            <FaHome /> Dashboard
          </Link>
          <Link to="/analytics" className="flex items-center gap-1 hover:text-gray-200">
            <FaChartBar /> Analytics
          </Link>
          <Link to="/approvals" className="flex items-center gap-1 hover:text-gray-200">
            <FaCheckCircle /> Approvals
          </Link>
          <Link to="/feed" className="flex items-center gap-1 hover:text-gray-200">
            <FaNewspaper /> Feed
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 hover:text-gray-200"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 bg-blue-700 p-3 rounded-lg">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <FaHome /> Dashboard
          </Link>
          <Link
            to="/analytics"
            className="flex items-center gap-2 hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <FaChartBar /> Analytics
          </Link>
          <Link
            to="/approvals"
            className="flex items-center gap-2 hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <FaCheckCircle /> Approvals
          </Link>
          <Link
            to="/feed"
            className="flex items-center gap-2 hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <FaNewspaper /> Feed
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

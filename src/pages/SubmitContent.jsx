import { useState ,useEffect} from "react";
import UserNavbar from "../components/UserNavbar";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'

function SubmitContent() {

  const userId = localStorage.getItem("id");

  const[formData,setFormData] = useState({
    title:"",
    description:"",
    createdBy:userId
  })
  
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await api.post('/content',formData)
      
      navigate('/user/dashboard')
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div>
      <ToastContainer/>
      <UserNavbar />
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Content</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitContent;

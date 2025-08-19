import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../service/api";
import {ToastContainer,toast} from 'react-toastify'

function Approvals() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContents = () => {
    setLoading(true);
    api
      .get("/content?status=pending")
      .then((res) => {
        setContents(res.data.contents);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleAction = async (id, action) => {
    try {
      let res;
      if (action === "approved") {
        res = await api.put(`/content/${id}/approve`);
      } else {
        res = await api.put(`/content/${id}/reject`);
      }
      toast.success(res.data.message)
      fetchContents();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer autoClose={1700}/>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Approvals</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : contents.length > 0 ? (
          <div className="space-y-4">
            {contents.map((c) => (
              <div
                key={c._id}
                className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {c.description?.slice(0, 100)}...
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(c._id, "approved")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(c._id, "rejected")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No pending contents</p>
        )}
      </div>
    </div>
  );
}

export default Approvals;

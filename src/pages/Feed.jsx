import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../service/api";

function Feed() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/content/recent")
      .then((res) => {
        setContents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Feed</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : contents.length > 0 ? (
          <div className="space-y-4">
            {contents.map((c) => (
              <div
                key={c._id}
                className="bg-white shadow rounded-lg p-4  transition
                  hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {c.description?.slice(0, 100)}...
                </p>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded ${
                    c.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No recent contents</p>
        )}
      </div>
    </div>
  );
}

export default Feed;

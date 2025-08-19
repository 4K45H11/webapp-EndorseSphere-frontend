import { useState, useEffect } from "react";
import ContentCard from "../components/ContentCard";
import Navbar from "../components/Navbar";
import api from "../service/api";
import { FaSearch } from "react-icons/fa";

function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalContent, setTotalContent] = useState(0);

  useEffect(() => {
    let url = `/content/?page=${page}`;
    if (filter !== "all") url += `&status=${filter}`;
    if (keyword.trim() !== "") url += `&keyword=${keyword}`;
    api
      .get(url)
      .then((res) => {
        setContents(res.data.contents);
        setPage(res.data.pageNo);
        setTotalPages(res.data.totalPage);
        setTotalContent(res.data.totalContentCount);
      })
      .catch((err) => console.error(err));
  }, [page, filter, keyword]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold my-4">Dashboard</h2>

        <h4 className="pb-3 text-gray-700">
          Total Contents: <span className="font-semibold">{totalContent}</span>
        </h4>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {["all", "approved", "pending", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded transition text-sm sm:text-base ${
                  filter === f
                    ? "bg-blue-500 text-white"
                    : f === "approved"
                    ? "bg-green-200 hover:bg-green-300"
                    : f === "pending"
                    ? "bg-yellow-200 hover:bg-yellow-300"
                    : f === "rejected"
                    ? "bg-red-200 hover:bg-red-300"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {contents.length > 0 ? (
            contents.map((c) => <ContentCard key={c._id} content={c} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No contents found
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap overflow-x-auto">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-lg border text-sm sm:text-base ${
                page === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Prev
            </button>
            {pageNumbers.map((p, i) => (
              <button
                key={i}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg border text-sm sm:text-base ${
                  page === p
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-4 py-2 rounded-lg border text-sm sm:text-base ${
                page === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

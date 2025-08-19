import { useEffect, useState } from "react";
import ContentCard from "../components/ContentCard";
import UserNavbar from "../components/UserNavbar";
import api from "../service/api";

function UserDashboard() {
    const [filter, setFilter] = useState("all");
    const [contents, setContents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalContent, setTotalContent] = useState(0);

    const userId = localStorage.getItem("id");

    useEffect(() => {
        let url = `/content/user/${userId}?page=${page}`;
        if (filter !== "all") {
            url += `&status=${filter}`;
        }
        api.get(url)
            .then((res) => {
                setContents(res.data.contents);
                setPage(res.data.pageNo);
                setTotalPages(res.data.totalPage);
                setTotalContent(res.data.totalContentCount);
            })
            .catch((err) => console.log(err));
    }, [page, filter]);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <UserNavbar />
            <h2 className="text-2xl font-bold my-4">UserDashboard</h2>

            {/* info section */}
            <h4 className="pb-3">Total Content: {totalContent}</h4>

            {/* filter section */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => {
                        setFilter("all");
                        setPage(1);
                    }}
                    className={`px-3 py-1 rounded ${
                        filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    All
                </button>
                <button
                    onClick={() => {
                        setFilter("approved");
                        setPage(1);
                    }}
                    className={`px-3 py-1 rounded ${
                        filter === "approved"
                            ? "bg-blue-500 text-white"
                            : "bg-green-200"
                    }`}
                >
                    Approved
                </button>
                <button
                    onClick={() => {
                        setFilter("pending");
                        setPage(1);
                    }}
                    className={`px-3 py-1 rounded ${
                        filter === "pending"
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-200"
                    }`}
                >
                    Pending
                </button>
                <button
                    onClick={() => {
                        setFilter("rejected");
                        setPage(1);
                    }}
                    className={`px-3 py-1 rounded ${
                        filter === "rejected"
                            ? "bg-blue-500 text-white"
                            : "bg-red-200"
                    }`}
                >
                    Rejected
                </button>
            </div>

            <div className="grid gap-3">
                {contents.map((c) => (
                    <ContentCard key={c._id} content={c} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className={`px-3 py-1 rounded border ${
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
                            className={`px-3 py-1 rounded border ${
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
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        className={`px-3 py-1 rounded border ${
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
    );
}

export default UserDashboard;

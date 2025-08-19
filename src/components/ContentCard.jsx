function ContentCard({ content }) {
  const statusColors = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-4 border rounded shadow-sm flex justify-between items-center">
      <h3 className="font-semibold">{content.title}</h3>
      <span className={`px-2 py-1 rounded ${statusColors[content.status]}`}>
        {content.status}
      </span>
    </div>
  );
}

export default ContentCard;

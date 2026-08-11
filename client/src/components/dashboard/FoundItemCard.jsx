import { useState } from "react";
import { Edit, Trash2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import noImage from "../../assets/noImage.svg";
import { deleteFoundItem } from "../../services/foundItemService";
import { createClaim } from "../../services/claimService";

function FoundItemCard({ item }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this found item?"
    );

    if (!confirmDelete) return;

    setLoading(true);

    try {
      await deleteFoundItem(item._id);

      toast.success("Found item deleted successfully!");

      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete found item.");
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    setClaimLoading(true);

    try {
      await createClaim(item._id);

      toast.success("Claim submitted successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to submit claim."
      );
    } finally {
      setClaimLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">

      {/* Image */}
      <div className="h-52 bg-slate-100">
        <img
          src={item.image || noImage}
          alt={item.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = noImage;
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">

        <h2 className="text-xl font-semibold text-slate-800">
          {item.title}
        </h2>

        <p className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {item.category}
        </p>

        <p className="mt-4 line-clamp-2 text-slate-600">
          {item.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} />
          {item.location}
        </div>

        {/* Claim Button */}
        <button
          onClick={handleClaim}
          disabled={loading || claimLoading || item.status !== "Available"}
          className="mt-5 w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {claimLoading
            ? "Claiming..."
            : item.status === "Available"
            ? "Claim Item"
            : item.status}
        </button>

        <div className="mt-4 flex justify-between">

          {/* Edit */}
          <button
            onClick={() => navigate(`/found-items/edit/${item._id}`)}
            disabled={loading || claimLoading}
            className="flex items-center gap-2 rounded-lg bg-yellow-100 px-4 py-2 text-yellow-700 hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Edit size={18} />
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={loading || claimLoading}
            className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={18} />
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default FoundItemCard;
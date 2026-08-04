import { Edit, Trash2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteLostItem } from "../../services/lostItemService";
import toast from "react-hot-toast";

function LostItemCard({ item }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this lost item?"
    );

    if (!confirmDelete) return;

    try {
        await deleteLostItem(item._id);

        toast.success("Lost item deleted successfully!");

        setTimeout(() => {
        navigate(0);
        }, 1000);
    } catch (error) {
        console.error(error);
        toast.error("Failed to delete lost item.");
    }
    };
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">

      {/* Image */}
      <div className="h-52 bg-slate-100">
        <img
        src={
            item.image ||
            "https://placehold.co/600x400?text=No+Image"
        }
        alt={item.title}
        className="h-full w-full object-cover"
        onError={(e) => {
            e.target.src =
            "https://placehold.co/600x400?text=No+Image";
        }}
        />
      </div>

      {/* Content */}
      <div className="p-5">

        <h2 className="text-xl font-semibold text-slate-800">
          {item.title}
        </h2>

        <p className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {item.category}
        </p>

        <p className="mt-4 line-clamp-2 text-slate-600">
          {item.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} />
          {item.location}
        </div>

        <div className="mt-6 flex justify-between">

        <button
        onClick={() => navigate(`/lost-items/edit/${item._id}`)}
        className="flex items-center gap-2 rounded-lg bg-yellow-100 px-4 py-2 text-yellow-700 hover:bg-yellow-200"
        >
        <Edit size={18} />
        Edit
        </button>

        <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200"
        >
        <Trash2 size={18} />
            Delete
        </button>

        </div>

      </div>
    </div>
  );
}

export default LostItemCard;
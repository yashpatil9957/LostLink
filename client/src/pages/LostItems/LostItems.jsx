import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getAllLostItems } from "../../services/lostItemService";
import LostItemCard from "../../components/dashboard/LostItemCard";
import { useNavigate } from "react-router-dom";

function LostItems() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      const response = await getAllLostItems();
      setLostItems(response.lostItems);
    } catch (error) {
      console.error("Error fetching lost items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Lost Items
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage all reported lost items.
          </p>
        </div>

        <button
          onClick={() => navigate("/lost-items/create")}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Report Lost Item
        </button>
      </div>

      {loading ? (
        <div className="text-center text-slate-500">
          Loading...
        </div>
      ) : lostItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            No Lost Items Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Report your first lost item to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
  {lostItems.map((item) => (
    <LostItemCard
      key={item._id}
      item={item}
    />
  ))}
</div>
      )}
    </DashboardLayout>
  );
}

export default LostItems;
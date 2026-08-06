import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import FoundItemCard from "../../components/dashboard/FoundItemCard";
import { getAllFoundItems } from "../../services/foundItemService";

function FoundItems() {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const fetchFoundItems = async () => {
    try {
      const response = await getAllFoundItems();
      setFoundItems(response.foundItems);
    } catch (error) {
      console.error("Error fetching found items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Found Items
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage all reported found items.
          </p>
        </div>

        <button
          onClick={() => navigate("/found-items/create")}
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Report Found Item
        </button>
      </div>

      {loading ? (
        <div className="text-center text-slate-500">
          Loading...
        </div>
      ) : foundItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            No Found Items Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Report your first found item to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {foundItems.map((item) => (
            <FoundItemCard
              key={item._id}
              item={item}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default FoundItems;
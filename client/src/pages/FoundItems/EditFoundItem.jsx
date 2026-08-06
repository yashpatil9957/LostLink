import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import FoundItemForm from "../../components/dashboard/FoundItemForm";
import { getFoundItemById } from "../../services/foundItemService";

function EditFoundItem() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await getFoundItemById(id);
      setItem(response.foundItem);
    } catch (error) {
      console.error("Error fetching found item:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h2 className="text-center text-xl">Loading...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <FoundItemForm
        mode="edit"
        item={item}
        itemId={id}
      />
    </DashboardLayout>
  );
}

export default EditFoundItem;
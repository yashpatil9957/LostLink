import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import LostItemForm from "../../components/dashboard/LostItemForm";
import { getLostItemById } from "../../services/lostItemService";

function EditLostItem() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await getLostItemById(id);
      setItem(response.lostItem);
    } catch (error) {
      console.error("Error fetching item:", error);
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
    <LostItemForm
    mode="edit"
    item={item}
    itemId={id}
    />
    </DashboardLayout>
  );
}

export default EditLostItem;
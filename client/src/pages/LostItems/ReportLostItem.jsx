import DashboardLayout from "../../components/dashboard/DashboardLayout";
import LostItemForm from "../../components/dashboard/LostItemForm";

function ReportLostItem() {
  return (
    <DashboardLayout>
      <LostItemForm mode="create" />
    </DashboardLayout>
  );
}

export default ReportLostItem;
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import FoundItemForm from "../../components/dashboard/FoundItemForm";

function ReportFoundItem() {
  return (
    <DashboardLayout>
      <FoundItemForm mode="create" />
    </DashboardLayout>
  );
}

export default ReportFoundItem;
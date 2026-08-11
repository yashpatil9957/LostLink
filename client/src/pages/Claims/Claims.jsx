import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import toast from "react-hot-toast";
import {
  getMyClaims,
  updateClaimStatus,
} from "../../services/claimService";

function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await getMyClaims();
      setClaims(response.claims);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load claims.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (claimId, status) => {
    setActionLoading(claimId);

    try {
      await updateClaimStatus(claimId, status);

      toast.success(
        status === "Accepted"
          ? "Claim accepted successfully!"
          : "Claim rejected successfully!"
      );

      await fetchClaims();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update claim."
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Claims
        </h1>

        <p className="mt-2 text-slate-500">
          Manage claims submitted for your found items.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center text-slate-500">
          Loading claims...
        </div>
      ) : claims.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            No Claims Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Claims submitted for your found items will appear here.
          </p>
        </div>
      ) : (
        /* Claims */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {claims.map((claim) => (
            <div
              key={claim._id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-800">
                {claim.foundItem?.title}
              </h2>

              <p className="mt-2 text-slate-500">
                Category: {claim.foundItem?.category}
              </p>

              <p className="mt-4 text-slate-600">
                Claimed by:{" "}
                <span className="font-medium text-slate-800">
                  {claim.claimedBy?.name}
                </span>
              </p>

              <p className="text-sm text-slate-500">
                {claim.claimedBy?.email}
              </p>

              {/* Status */}
              <div className="mt-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    claim.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : claim.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {claim.status}
                </span>
              </div>

              {/* Actions */}
              {claim.status === "Pending" && (
                <div className="mt-6 flex gap-3">

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        claim._id,
                        "Accepted"
                      )
                    }
                    disabled={actionLoading === claim._id}
                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoading === claim._id
                      ? "Processing..."
                      : "Accept"}
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        claim._id,
                        "Rejected"
                      )
                    }
                    disabled={actionLoading === claim._id}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoading === claim._id
                      ? "Processing..."
                      : "Reject"}
                  </button>

                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Claims;
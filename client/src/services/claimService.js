import api from "../api/axios";

// Create a claim
export const createClaim = async (foundItemId) => {
  const response = await api.post("/claims", {
    foundItemId,
  });

  return response.data;
};

// Get claims for my found items
export const getMyClaims = async () => {
  const response = await api.get("/claims");

  return response.data;
};

// Accept or reject a claim
export const updateClaimStatus = async (claimId, status) => {
  const response = await api.put(`/claims/${claimId}`, {
    status,
  });

  return response.data;
};
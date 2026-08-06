import api from "../api/axios";

// Create Found Item
export const createFoundItem = async (formData) => {
  const response = await api.post("/found-items", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get All Found Items
export const getAllFoundItems = async () => {
  const response = await api.get("/found-items");
  return response.data;
};

// Get Single Found Item
export const getFoundItemById = async (id) => {
  const response = await api.get(`/found-items/${id}`);
  return response.data;
};

// Update Found Item
export const updateFoundItem = async (id, formData) => {
  const response = await api.put(`/found-items/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete Found Item
export const deleteFoundItem = async (id) => {
  const response = await api.delete(`/found-items/${id}`);
  return response.data;
};
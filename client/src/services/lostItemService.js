import api from "../api/axios";

// Get all lost items
export const getAllLostItems = async () => {
  const response = await api.get("/lost-items");
  return response.data;
};

// Get single lost item
export const getLostItemById = async (id) => {
  const response = await api.get(`/lost-items/${id}`);
  return response.data;
};

// Create lost item
export const createLostItem = async (formData) => {
  const response = await api.post("/lost-items", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update lost item
export const updateLostItem = async (id, formData) => {
  const response = await api.put(`/lost-items/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete lost item
export const deleteLostItem = async (id) => {
  const response = await api.delete(`/lost-items/${id}`);
  return response.data;
};
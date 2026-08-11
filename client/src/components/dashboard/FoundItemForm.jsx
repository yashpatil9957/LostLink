import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createFoundItem,
  updateFoundItem,
} from "../../services/foundItemService";

function FoundItemForm({ mode, item, itemId }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    dateFound: "",
    image: null,
  });

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        title: item.title || "",
        category: item.category || "",
        description: item.description || "",
        location: item.location || "",
        dateFound: item.dateFound
          ? new Date(item.dateFound).toISOString().split("T")[0]
          : "",
        image: null,
      });
    }
  }, [item, mode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("dateFound", formData.dateFound);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (mode === "create") {
        await createFoundItem(data);
        toast.success("Found item reported successfully!");
      } else {
        await updateFoundItem(itemId, data);
        toast.success("Found item updated successfully!");
      }

      navigate("/found-items");
    } catch (error) {
      console.error(error);

      toast.error(
        mode === "create"
          ? "Failed to report found item."
          : "Failed to update found item."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        {mode === "create" ? "Report Found Item" : "Edit Found Item"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Item Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter item title"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            required
            disabled={loading}
          >
            <option value="">Select Category</option>
            <option value="Wallet">Wallet</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Keys">Keys</option>
            <option value="ID Card">ID Card</option>
            <option value="Bag">Bag</option>
            <option value="Documents">Documents</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the found item..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Found Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where did you find it?"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Date Found */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Date Found
          </label>

          <input
            type="date"
            name="dateFound"
            value={formData.dateFound}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Image */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Upload New Image (Optional)
          </label>

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            disabled={loading}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={() => navigate("/found-items")}
            disabled={loading}
            className="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? mode === "create"
                ? "Reporting..."
                : "Updating..."
              : mode === "create"
              ? "Report Item"
              : "Update Item"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default FoundItemForm;
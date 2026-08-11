import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createLostItem,
  updateLostItem,
} from "../../services/lostItemService";

function LostItemForm({ mode, item, itemId }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    datelost: "",
    reward: "",
    image: null,
  });

  // Prefill form in edit mode
  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        title: item.title || "",
        category: item.category || "",
        description: item.description || "",
        location: item.location || "",
        datelost: item.datelost
          ? new Date(item.datelost).toISOString().split("T")[0]
          : "",
        reward: item.reward || "",
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
      data.append("datelost", formData.datelost);
      data.append("reward", formData.reward);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (mode === "create") {
        await createLostItem(data);
        toast.success("Lost item reported successfully!");
      } else {
        await updateLostItem(itemId, data);
        toast.success("Lost item updated successfully!");
      }

      navigate("/lost-items");
    } catch (error) {
      console.error(error);

      toast.error(
        mode === "create"
          ? "Failed to report lost item."
          : "Failed to update lost item."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        {mode === "create" ? "Report Lost Item" : "Edit Lost Item"}
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
            placeholder="Describe your lost item..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Lost Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where did you lose it?"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Date Lost */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Date Lost
          </label>

          <input
            type="date"
            name="datelost"
            value={formData.datelost}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            required
            disabled={loading}
          />
        </div>

        {/* Reward */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Reward (Optional)
          </label>

          <input
            type="number"
            name="reward"
            value={formData.reward}
            onChange={handleChange}
            placeholder="Enter reward amount"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
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
            onClick={() => navigate("/lost-items")}
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

export default LostItemForm;
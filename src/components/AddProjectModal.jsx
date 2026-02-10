import { useState } from "react";
import { createProject } from "../api/projectApi";
import { X, Briefcase, User, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AddProjectModal({ close, refresh }) {
  const [form, setForm] = useState({
    name: "",
    client_name: "",
    estimated_budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Logic Validation: Prevent negative amounts
    const budget = parseFloat(form.estimated_budget);
    if (budget <= 0) {
      return toast.error("Budget must be a positive number");
    }

    if (!form.name || !form.client_name) {
      return toast.error("Please fill in all required fields");
    }

    setIsSubmitting(true);
    try {
      // 2. API Call
      await createProject({
        ...form,
        estimated_budget: budget, // Ensure numeric type
      });

      // 3. Feedback and Sync
      toast.success("Project launched successfully!");

      // We await refresh to ensure the parent state updates
      // before the modal disappears for a smoother UX
      await refresh();
      close();
    } catch (error) {
      console.error("Submission failed", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={close}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Add New Project
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Initialize a new tracker
            </p>
          </div>
          <button
            onClick={close}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Project Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Project Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Briefcase size={16} />
              </div>
              <input
                autoFocus
                required
                placeholder="e.g. Palm Jumeirah Villa"
                className="flex h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          {/* Client Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Client / Developer
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <User size={16} />
              </div>
              <input
                required
                placeholder="e.g. Emaar Properties"
                className="flex h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={form.client_name}
                onChange={(e) =>
                  setForm({ ...form, client_name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex justify-between">
              Total Budget <span>(AED)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-[10px]">
                AED
              </div>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className="flex h-11 w-full rounded-lg border border-slate-200 bg-white pl-12 pr-4 py-2 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={form.estimated_budget}
                onChange={(e) =>
                  setForm({ ...form, estimated_budget: e.target.value })
                }
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={close}
              className="flex-1 px-4 py-3 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Launch Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

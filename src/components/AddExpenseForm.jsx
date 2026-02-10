import { useState } from "react";
import { addExpense } from "../api/projectApi";
import { Plus, Tag, TextQuote, Loader2 } from "lucide-react";
import toast from "react-hot-toast"; 

export default function AddExpenseForm({ projectId, onSuccess }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "material",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    const numericAmount = parseFloat(form.amount);
    if (numericAmount <= 0) {
      toast.error("Please enter a valid amount greater than zero.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await addExpense({
        ...form,
        amount: numericAmount, 
        project_id: projectId,
      });
      if (response) {
        setForm({ description: "", amount: "", category: "material" });
        await onSuccess();
        toast.success("Expense added successfully!");
      }
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast.error("Error saving expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50/50 p-4 rounded-xl border border-slate-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Description Input */}
        <div className="space-y-1.5 flex-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Expense Details
          </label>
          <div className="relative">
            <TextQuote
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              required
              placeholder="e.g. Lumber for framing"
              className="w-full h-10 bg-white border border-slate-200 rounded-lg pl-9 pr-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-1.5 w-full">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Cost
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">
              AED
            </div>
            <input
              required
              type="number"
              step="0.01"
              min="0.01" 
              placeholder="0.00"
              className="w-full h-10 bg-white border border-slate-200 rounded-lg pl-9 pr-3 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
        </div>

        {/* Category Select */}
        <div className="space-y-1.5 w-full">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Category
          </label>
          <div className="relative">
            <Tag
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              className="w-full h-10 bg-white border border-slate-200 rounded-lg pl-9 pr-3 text-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="material">Material</option>
              <option value="labor">Labor</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isSubmitting || !form.description || !form.amount}
          className="h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 px-6"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Plus size={16} /> Add Expense
            </>
          )}
        </button>
      </div>
    </form>
  );
}

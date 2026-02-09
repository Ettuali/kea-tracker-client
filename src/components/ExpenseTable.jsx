import { useEffect, useState } from "react";
import {
  getProjectById,
  deleteExpense,
  updateExpense,
} from "../api/projectApi";
import {
  Trash2,
  Edit3,
  Receipt,
  Inbox,
  Check,
  X,
  AlertTriangle,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ExpenseTable({ projectId, refresh }) {
  const [expenses, setExpenses] = useState([]);
  const [projectData, setProjectData] = useState(null); // To store client name
  const [loading, setLoading] = useState(true);

  // States for Inline Editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
    category: "",
  });

  // State for Delete Confirmation Modal
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getProjectById(projectId);
      setExpenses(res.data.expenses || []);
      setProjectData(res.data); // Capture project details (name/client)
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await updateExpense(id, editForm);
      setEditingId(null);
      await fetchData();
      refresh();
      toast.success("Expense updated successfully");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteExpense(deleteId);
      setDeleteId(null);
      await fetchData();
      refresh();
      toast.success("Expense deleted permanently");
    } catch (error) {
      toast.error("Could not delete expense");
    }
  };

  const getCategoryStyle = (category) => {
    const base = "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ";
    switch (category?.toLowerCase()) {
      case "material": return base + "bg-blue-50 text-blue-700 border border-blue-100";
      case "labor": return base + "bg-emerald-50 text-emerald-700 border border-emerald-100";
      default: return base + "bg-slate-50 text-slate-600 border border-slate-200";
    }
  };

  if (!loading && expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 bg-white rounded-lg border border-dashed border-slate-200">
        <Inbox className="text-slate-300 mb-2" size={24} />
        <p className="text-xs font-medium text-slate-500">No expenses recorded.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto relative">
      {/* Custom Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl p-5 max-w-xs w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 text-amber-600 mb-3">
              <AlertTriangle size={20} />
              <h3 className="font-bold text-base text-slate-900">Confirm Deletion</h3>
            </div>
            <p className="text-slate-500 text-xs mb-5 leading-relaxed">
              Are you sure? This will permanently remove the item from <strong>{projectData?.name}</strong>.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-3 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project / Description</th>
            <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
            <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Category</th>
            <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {expenses.map((e) => (
            <tr key={e.id} className={`transition-colors ${editingId === e.id ? "bg-blue-50/40" : "hover:bg-slate-50/50 group"}`}>
              {editingId === e.id ? (
                <>
                  <td className="px-4 py-2">
                    <input 
                      className="w-full px-2 py-1 text-xs border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={editForm.description} 
                      onChange={(opt) => setEditForm({...editForm, description: opt.target.value})} 
                    />
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="relative inline-block">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-400">AED</span>
                      <input type="number" className="w-24 pl-8 pr-2 py-1 text-xs border border-blue-200 rounded-md text-right font-mono" value={editForm.amount} onChange={(opt) => setEditForm({ ...editForm, amount: opt.target.value })} />
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <select className="text-[10px] border border-blue-200 rounded-md px-1 py-1 outline-none" value={editForm.category} onChange={(opt) => setEditForm({ ...editForm, category: opt.target.value })}>
                      <option value="material">Material</option>
                      <option value="labor">Labor</option>
                      <option value="other">Other</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleUpdate(e.id)} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"><Check size={14} /></button>
                      <button onClick={() => setEditingId(null)} className="p-1 text-red-400 hover:bg-red-50 rounded"><X size={14} /></button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-1.5 bg-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
                        <Receipt size={12} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700 leading-none mb-1">{e.description}</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <User size={10} />
                          <span>{projectData?.client_name || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-bold font-mono text-slate-900">
                      AED {Number(e.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={getCategoryStyle(e.category)}>{e.category}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(e)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"><Edit3 size={14} /></button>
                      <button onClick={() => setDeleteId(e.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
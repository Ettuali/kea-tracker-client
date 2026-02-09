import { useState } from "react";
import ExpenseTable from "./ExpenseTable";
import AddExpenseForm from "./AddExpenseForm";
import { ChevronDown, ChevronUp, Plus, TrendingUp } from "lucide-react";

const ProjectCard = ({ project, refreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const budget = Number(project.estimated_budget) || 0;
  const totalSpent = Number(project.total_expenses) || 0;
  const remaining = Number(project.remaining_budget) || 0;
  const percentUsed = budget > 0 ? (totalSpent / budget) * 100 : 0;

  return (
    <div
      className={`bg-white border ${isOpen ? "border-blue-200 ring-1 ring-blue-50" : "border-slate-200"} rounded-xl mb-5 overflow-hidden transition-all shadow-sm`}
    >
      <div
        className={`p-6 flex items-center justify-between cursor-pointer ${isOpen ? "bg-slate-50/50" : "hover:bg-slate-50"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Project Name
            </span>
            <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Budget
            </span>
            <p className="text-lg font-semibold text-slate-700 font-mono">
              AED{" "}
              {budget.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Remaining
            </span>
            <p
              className={`text-lg font-bold font-mono ${remaining < 0 ? "text-red-600" : "text-emerald-600"}`}
            >
              AED{" "}
              {remaining.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="flex flex-col justify-center pr-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <TrendingUp size={12} /> Utilization
              </span>
              <span
                className={`text-xs font-bold ${percentUsed > 90 ? "text-red-600" : "text-blue-600"}`}
              >
                {percentUsed.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50">
              <div
                className={`h-full transition-all duration-700 ${percentUsed > 100 ? "bg-red-500" : percentUsed > 80 ? "bg-amber-500" : "bg-blue-600"}`}
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              />
            </div>
          </div>
        </div>
        <div
          className={`p-2 rounded-full ${isOpen ? "bg-blue-100 text-blue-600" : "text-slate-400"}`}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white p-8">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
              Expense Ledger
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowExpenseForm(!showExpenseForm);
              }}
              className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              {showExpenseForm ? (
                "Close Form"
              ) : (
                <>
                  <Plus size={14} /> Add Expense
                </>
              )}
            </button>
          </div>
          {showExpenseForm && (
            <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
              <AddExpenseForm
                projectId={project.id}
                onSuccess={() => {
                  setShowExpenseForm(false);
                  refreshData();
                }}
              />
            </div>
          )}
          <ExpenseTable projectId={project.id} refresh={refreshData} />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;

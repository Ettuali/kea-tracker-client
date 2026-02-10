import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  onPageChange 
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const btnClass = "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 transition-colors";

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 border border-slate-200 rounded-2xl shadow-sm mt-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-bold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
          <span className="font-bold text-slate-900">{totalItems}</span> projects
        </p>
        
        <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm overflow-hidden border border-slate-300">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-2 py-2 text-slate-400 hover:bg-slate-50 disabled:opacity-30 border-r border-slate-300"
          >
            <ChevronLeft size={20} />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`${btnClass} ${
                currentPage === i + 1 ? "z-10 bg-blue-600 text-white hover:bg-blue-700 ring-blue-600" : "text-slate-900"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-2 py-2 text-slate-400 hover:bg-slate-50 disabled:opacity-30 border-l border-slate-300"
          >
            <ChevronRight size={20} />
          </button>
        </nav>
      </div>
    </div>
  );
}
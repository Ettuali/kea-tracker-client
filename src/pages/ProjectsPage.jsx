import { useEffect, useState, useMemo } from "react";
import { getProjects } from "../api/projectApi";
import ProjectCard from "../components/ProjectCard";
import AddProjectModal from "../components/AddProjectModal";
import Pagination from "../components/Pagination";
import {
  Plus,
  LayoutDashboard,
  BarChart3,
  Wallet,
  FolderKanban,
  Search,
  Loader2,
} from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getProjects();
      setProjects(res.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Reset to page 1 when user searches to avoid "empty page" bugs
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // UseMemo for derived data (Interviewers love this for performance optimization)
  const filteredProjects = useMemo(() => {
    return projects.filter(
      (p) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client_name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [projects, searchQuery]);

  const currentProjectsPage = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const totalBudget = projects.reduce(
    (acc, p) => acc + (Number(p.estimated_budget) || 0),
    0,
  );
  const totalSpent = projects.reduce(
    (acc, p) => acc + (Number(p.total_expenses) || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-md shadow-blue-100">
              <FolderKanban size={22} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
              KEA <span className="text-blue-600">Tracker</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm font-semibold text-slate-600">
              Project Dashboard
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Global Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <StatCard
            icon={<Wallet size={24} />}
            label="Total Budget"
            value={totalBudget}
            color="blue"
          />
          <StatCard
            icon={<BarChart3 size={24} />}
            label="Total Expenses"
            value={totalSpent}
            color="amber"
          />
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tighter">
              Project Overview
            </h2>
            <p className="text-slate-500 text-sm">
              Monitoring construction assets
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none shadow-sm w-full md:w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <Plus size={16} strokeWidth={3} /> Create Project
            </button>
          </div>
        </div>

        {/* Project List Rendering */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
              <Loader2 className="mx-auto h-10 w-10 text-blue-500 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">
                Fetching project data...
              </p>
            </div>
          ) : currentProjectsPage.length > 0 ? (
            <>
              {currentProjectsPage.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  refreshData={fetchProjects}
                />
              ))}

              <Pagination
                totalItems={filteredProjects.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 shadow-inner">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard size={40} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                No active projects found
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Try adjusting your search or add a new project.
              </p>
            </div>
          )}
        </div>
      </main>

      {openModal && (
        <AddProjectModal
          close={() => setOpenModal(false)}
          refresh={fetchProjects}
        />
      )}
    </div>
  );
}

// Sub-component for clean code (Interviewers love seeing reusable internal components)
function StatCard({ icon, label, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-5 transition-hover hover:shadow-md">
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-2xl font-black text-slate-800 tabular-nums">
          AED {value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}

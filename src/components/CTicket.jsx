import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ArrowRight, CheckCircle2, LayoutGrid, Clock } from "lucide-react";

const CTicket = ({ setInProgressCount, setResolvedCount }) => {
  const [tickets, setTickets] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [resolvedTasks, setResolvedTasks] = useState([]);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const response = await fetch("/ticket.JSON");
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        // Red underline সরানোর জন্য error variable টি কনসোলে ব্যবহার করা হলো
        console.error("Fetch Error:", err);
        toast.error("Failed to load tickets!");
      }
    };
    loadTickets();
  }, []);

  const handleAddToStatus = (ticket) => {
    const isExist = taskStatus.find((item) => item.id === ticket.id);
    const isResolved = resolvedTasks.find((item) => item.id === ticket.id);

    if (isResolved) {
      toast.error("This ticket is already resolved!");
      return;
    }

    if (!isExist) {
      setTaskStatus([...taskStatus, ticket]);
      setInProgressCount((prev) => prev + 1);
      toast.success(`Active: ${ticket.title}`);
    } else {
      toast("Already in progress!", { icon: "⚠️" });
    }
  };

  const handleComplete = (task) => {
    setTaskStatus(taskStatus.filter((item) => item.id !== task.id));
    setResolvedTasks([...resolvedTasks, task]);
    setInProgressCount((prev) => prev - 1);
    setResolvedCount((prev) => prev + 1);

    toast.success("Task Resolved Successfully!", {
      style: { background: "#7c3aed", color: "#fff" },
    });
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-16 bg-[#f8fafc] min-h-screen">
      <Toaster position="top-center" />

      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
        {/* Left Side: Premium Ticket Cards */}
        <div className="lg:w-2/3">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <LayoutGrid size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Ticket Queue
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => handleAddToStatus(ticket)}
                className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-500"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
                      #{ticket.id}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-1 rounded-md ${
                        ticket.priority === "High"
                          ? "bg-red-50 text-red-500"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                    {ticket.title}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-400 mb-4">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600 font-bold uppercase">
                      {ticket.customer.charAt(0)}
                    </div>
                    <p className="text-sm font-medium">{ticket.customer}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs text-slate-400">
                      Created Today
                    </span>
                    <ArrowRight
                      className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                      size={18}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Status Sections */}
        <div className="lg:w-1/3 space-y-8">
          {/* Task Status (In Progress) */}
          <div className="bg-white p-8  shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <h2 className="text-xl font-bold mb-6 flex items-center justify-between text-slate-800">
              In Progress
              <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">
                {taskStatus.length}
              </span>
            </h2>
            <div className="space-y-4">
              {taskStatus.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group"
                >
                  <p className="font-bold text-slate-700 text-sm mb-3 line-clamp-1">
                    {task.title}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComplete(task);
                    }}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                  >
                    <CheckCircle2 size={14} /> Mark Done
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Resolved Task Section */}
          <div className="bg-white p-8  shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
            <h2 className="text-xl font-bold mb-6 flex items-center justify-between text-slate-800">
              Resolved
              <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                {resolvedTasks.length}
              </span>
            </h2>
            <div className="space-y-3">
              {resolvedTasks.length === 0 && (
                <div className="text-center py-6">
                  <Clock className="mx-auto text-slate-300 mb-2" size={30} />
                  <p className="text-slate-400 text-xs italic">
                    Waiting for completion...
                  </p>
                </div>
              )}
              {resolvedTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-purple-50/50 rounded-xl flex justify-between items-center border border-purple-100"
                >
                  <p className="font-medium text-xs text-slate-600 truncate mr-2">
                    {task.title}
                  </p>
                  <div className="bg-purple-600 p-1 rounded-full text-white">
                    <CheckCircle2 size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTicket;

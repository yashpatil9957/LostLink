import React from "react";

function DashboardCard({ title, count, icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {count}
          </h2>
        </div>

        <div
          className={`h-14 w-14 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default DashboardCard;
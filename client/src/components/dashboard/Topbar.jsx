import { Search } from "lucide-react";

function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>
        <h1 className="text-2xl font-bold text-blue-600">
          LostLink
        </h1>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-600"
          />
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold">
            {user?.name}
          </p>

          <p className="text-xs text-slate-500">
            {user?.email}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

      </div>

    </header>
  );
}

export default Topbar;
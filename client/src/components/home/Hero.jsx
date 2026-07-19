import {
  Search,
  CreditCard,
  Smartphone,
  KeyRound,
  Backpack,
  Headphones,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Background Blur */}
      <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-blue-100 blur-3xl opacity-50"></div>
      <div className="absolute top-24 right-0 h-80 w-80 rounded-full bg-cyan-100 blur-3xl opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              ✨ Smart Lost & Found Platform
            </span>

            <h1 className="mt-6 font-heading text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
              Lost Something?
              <br />
              <span className="text-blue-600">
                Find It Faster with LostLink.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Report lost belongings, discover found items, and reconnect with
              your valuables through one secure platform designed for campuses
              and workplaces.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-xl bg-blue-600 px-7 py-3.5 font-medium text-white transition hover:bg-blue-700">
                Report Lost Item
              </button>

              <button className="rounded-xl border border-blue-600 px-7 py-3.5 font-medium text-blue-600 transition hover:bg-blue-50">
                Browse Found Items
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative flex items-center justify-center h-[450px]">

            {/* Background Glow */}
            <div className="absolute h-80 w-80 rounded-full bg-blue-100 blur-3xl opacity-60"></div>

            {/* Center Search */}
            <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-blue-600 bg-white shadow-xl">
              <Search size={55} className="text-blue-600" />
            </div>

            {/* ID Card */}
            <div className="absolute top-6 left-24 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-2">
              <CreditCard size={34} className="text-blue-600" />
            </div>

            {/* Phone */}
            <div className="absolute top-8 right-24 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-2">
              <Smartphone size={34} className="text-blue-600" />
            </div>

            {/* Backpack */}
            <div className="absolute bottom-10 left-20 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-2">
              <Backpack size={34} className="text-blue-600" />
            </div>

            {/* Keys */}
            <div className="absolute bottom-10 right-20 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-2">
              <KeyRound size={34} className="text-blue-600" />
            </div>

            {/* Headphones */}
            <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-2">
              <Headphones size={34} className="text-blue-600" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
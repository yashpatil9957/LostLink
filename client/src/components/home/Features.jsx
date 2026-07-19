import {
  Search,
  Package,
  Bell,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Report Lost Items",
    description:
      "Quickly report lost belongings with details, location and photos.",
  },
  {
    icon: Package,
    title: "Report Found Items",
    description:
      "Upload found items and help others reconnect with their valuables.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Receive instant updates whenever a potential match is detected.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Claim Process",
    description:
      "Verify ownership before handing over any recovered item.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Badge */}

        <div className="flex justify-center">
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
            ✨ Features
          </span>
        </div>

        {/* Heading */}

        <div className="mx-auto mt-6 max-w-3xl text-center">

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">
            Everything You Need to
            <span className="text-blue-600">
              {" "}Recover Faster
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            LostLink provides everything you need to report, discover,
            and recover lost belongings in one secure platform.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl bg-white border border-slate-200 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 transition group-hover:bg-blue-600">

                  <Icon
                    size={28}
                    className="text-blue-600 transition group-hover:text-white"
                  />

                </div>

                <h3 className="mt-6 font-heading text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>

                <button className="mt-8 flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </button>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;
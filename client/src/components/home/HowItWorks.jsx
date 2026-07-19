import {
  FileSearch,
  SearchCheck,
  Handshake,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    title: "Report",
    description:
      "Submit details about the lost or found item along with its location and image.",
  },
  {
    icon: SearchCheck,
    title: "Smart Match",
    description:
      "LostLink intelligently compares reports and suggests the best possible matches.",
  },
  {
    icon: Handshake,
    title: "Claim & Recover",
    description:
      "Verify ownership securely and collect your belongings with confidence.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
            🚀 How It Works
          </span>

          <h2 className="mt-6 font-heading text-4xl md:text-5xl font-bold text-slate-900">
            Find Your Belongings in
            <span className="text-blue-600"> Three Simple Steps</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Our simple process helps connect lost and found items quickly,
            making recovery easier than ever.
          </p>

        </div>

        {/* Steps */}

        <div className="mt-20 grid gap-10 lg:grid-cols-3">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative text-center">

                {/* Step Number */}

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">

                  <Icon size={30} />

                </div>

                <div className="mt-6 inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600">
                  Step {index + 1}
                </div>

                <h3 className="mt-5 font-heading text-2xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>

                {/* Desktop Arrow */}

                {index !== steps.length - 1 && (
                  <ArrowRight
                    size={30}
                    className="hidden lg:block absolute top-8 -right-8 text-blue-400"
                  />
                )}
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
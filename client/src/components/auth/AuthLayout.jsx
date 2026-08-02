import { Link } from "react-router-dom";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4">

      {/* Background Glow */}
      <div className="absolute right-20 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-10 h-56 w-56 rounded-full bg-blue-50 blur-3xl opacity-70"></div>

      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">

        <div className="mb-6 text-center">

          <Link
            to="/"
            className="text-4xl font-extrabold tracking-tight text-blue-600"
          >
            LostLink
          </Link>

          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>

        </div>

        {children}

        <p className="mt-6 text-center text-sm text-slate-500">
          {footerText}{" "}
          <Link
            to={footerLink}
            className="font-semibold text-blue-600 hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>

      </div>
    </div>
  );
}

export default AuthLayout;
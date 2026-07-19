import { Mail } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        {/* Top */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div className="lg:col-span-2">

            <h2 className="font-heading text-3xl font-bold text-white">
              Lost<span className="text-blue-500">Link</span>
            </h2>

            <p className="mt-5 max-w-md leading-8 text-slate-400">
              LostLink is a smart Lost & Found platform that helps students and
              employees reconnect with their belongings through a simple,
              secure and organized process.
            </p>

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-600"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-600"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-600"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-600"
              >
                <Mail size={18} />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-heading text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">

              <li>
                <a href="#" className="hover:text-blue-400">
                  Home
                </a>
              </li>

              <li>
                <a href="#features" className="hover:text-blue-400">
                  Features
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-heading text-lg font-semibold">
              Contact
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">

              <li>support@lostlink.com</li>

              <li>Pune, Maharashtra</li>

              <li>Available 24 × 7</li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} LostLink. All Rights Reserved.
          </p>

          <p className="text-sm text-slate-400">
            Built with ❤️ using React, Tailwind CSS & Node.js
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
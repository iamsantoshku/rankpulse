import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane
} from "react-icons/fa";

import {
  MdEmail,
  MdPhone,
  MdLocationOn
} from "react-icons/md";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white mt-16">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-5 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div className="lg:col-span-2">

          <h2 className="text-4xl font-extrabold text-indigo-400">
            RankPulse
          </h2>

          <p className="text-gray-300 mt-4 leading-7">
            India’s modern exam preparation platform for
            Mock Tests, Daily Quizzes, Study Notes,
            Previous Year Papers, Current Affairs,
            and Real Exam Analytics.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6">

            <a
              href="https://www.instagram.com/santosh_chaudhary0055?igsh=MWgwbzJhd2J0eHV4NA=="
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-indigo-500 flex items-center justify-center transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-500 flex items-center justify-center transition"
            >
              <FaTwitter />
            </a>

            <a
              href="https://www.instagram.com/santosh_chaudhary0055?igsh=MWgwbzJhd2J0eHV4NA=="
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500 flex items-center justify-center transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/in/santosh-kumar-3a9939228/"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center transition"
            >
              <FaYoutube />
            </a>

          </div>
        </div>

        {/* QUICK LINKS */}
        <div>

          <h3 className="text-xl font-bold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">

            <li>
              <Link
                to="/"
                className="hover:text-indigo-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/exams"
                className="hover:text-indigo-400"
              >
                All Exams
              </Link>
            </li>

            <li>
              <Link
                to="/daily-quiz"
                className="hover:text-indigo-400"
              >
                Daily Quiz
              </Link>
            </li>

            <li>
              <Link
                to="/study-notes"
                className="hover:text-indigo-400"
              >
                Study Notes
              </Link>
            </li>

            <li>
              <Link
                to="/current-affairs"
                className="hover:text-indigo-400"
              >
                Current Affairs
              </Link>
            </li>

          </ul>
        </div>

        {/* FEATURES */}
        <div>

          <h3 className="text-xl font-bold mb-5">
            Features
          </h3>

          <ul className="space-y-3 text-gray-300">

            <li className="hover:text-indigo-400 cursor-pointer">
              Mock Tests
            </li>

            <li className="hover:text-indigo-400 cursor-pointer">
              Live Tests
            </li>

            <li className="hover:text-indigo-400 cursor-pointer">
              PYQs
            </li>

            <li className="hover:text-indigo-400 cursor-pointer">
              Test Analysis
            </li>

            <li className="hover:text-indigo-400 cursor-pointer">
              Rank Predictor
            </li>

          </ul>
        </div>

        {/* CONTACT */}
        <div>

          <h3 className="text-xl font-bold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-gray-300">

            <div className="flex items-center gap-3">
              <MdEmail className="text-indigo-400 text-xl" />
              <p>support@rankpulse.com</p>
            </div>

            <div className="flex items-center gap-3">
              <MdPhone className="text-indigo-400 text-xl" />
              <p>+91 7033825186</p>
            </div>

            <div className="flex items-start gap-3">
              <MdLocationOn className="text-indigo-400 text-xl mt-1" />
              <p>
                Patna, Bihar, India
              </p>
            </div>

          </div>

          {/* TELEGRAM */}
          <button className="mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold transition">

            <FaTelegramPlane />

            Join Telegram

          </button>

        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">

          <div>
            <h3 className="text-2xl font-bold">
              Subscribe Newsletter
            </h3>

            <p className="text-gray-400 mt-1">
              Get latest exam updates & quizzes
            </p>
          </div>

          <div className="flex w-full lg:w-auto">

            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-l-xl w-full lg:w-80 text-black outline-none"
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-r-xl font-semibold transition">
              Subscribe
            </button>

          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">

          <p>
            © 2026 RankPulse. All rights reserved.
          </p>

          <div className="flex gap-6">

            <Link
              to="/privacy-policy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white"
            >
              Terms
            </Link>

            <Link
              to="/refund-policy"
              className="hover:text-white"
            >
              Refund Policy
            </Link>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;




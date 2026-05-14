// import {
//   getSubjectsByExam
// } from "../../services/studyNote.service";

// import { useEffect, useState } from "react";

// import { useNavigate, useParams }
// from "react-router-dom";

// const SubjectNotesPage = () => {

//   const { examId } = useParams();

//   const [subjects, setSubjects] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSubjects();
//   }, []);

//   const fetchSubjects = async () => {
//     const res =
//       await getSubjectsByExam(examId);

//     setSubjects(res.data);
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-100">

//       <h1 className="text-4xl font-bold mb-10">
//         Subjects
//       </h1>

//       <div className="grid grid-cols-3 gap-6">

//         {subjects.map((subject, i) => (

//           <div
//             key={i}
//             onClick={() =>
//               navigate(
//                 `/study-notes/${examId}/${subject}`
//               )
//             }
//             className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-xl"
//           >

//             <h2 className="text-2xl font-bold">
//               {subject}
//             </h2>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubjectNotesPage;



import {
  getSubjectsByExam
} from "../../services/studyNote.service";

import {
  useEffect,
  useState,
  useMemo
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  BookOpen,
  Search,
  ChevronRight,
  GraduationCap,
  FileText,
  Sparkles
} from "lucide-react";

const SubjectNotesPage = () => {

  const { examId } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, [examId]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const res =
        await getSubjectsByExam(examId);

      setSubjects(res.data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FILTERED SUBJECTS
  const filteredSubjects = useMemo(() => {

    if (!search.trim()) return subjects;

    return subjects.filter((subject) =>
      subject
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [search, subjects]);

  const SubjectCard = ({ subject, index }) => {

    const gradients = [
      "from-blue-500 to-indigo-600",
      "from-green-500 to-emerald-600",
      "from-orange-500 to-red-500",
      "from-purple-500 to-pink-500",
      "from-cyan-500 to-blue-500",
      "from-yellow-500 to-orange-500"
    ];

    const gradient =
      gradients[index % gradients.length];

    return (
      <div
        onClick={() =>
          navigate(
            `/study-notes/${examId}/${encodeURIComponent(subject)}`
          )
        }
        className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
      >

        {/* TOP */}
        <div
          className={`bg-gradient-to-r ${gradient} p-6 relative`}
        >

          <div className="absolute top-0 right-0 opacity-10 text-white text-8xl font-bold">
            {index + 1}
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <BookOpen size={30} />
          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6">

          <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-2">
            <FileText size={16} />
            Study Material
          </div>

          <h2 className="text-2xl font-bold text-gray-800 line-clamp-2 min-h-[64px]">
            {subject}
          </h2>

          <p className="text-sm text-gray-500 mt-3">
            Notes, PDFs, formulas, revision
            materials and practice resources.
          </p>

          <button
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
          >
            Open Notes

            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-all"
            />

          </button>

        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white py-16 px-6">

        <div className="max-w-7xl mx-auto text-center">

          <div className="flex justify-center mb-5">

            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <GraduationCap size={42} />
            </div>

          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold">
            Subject Wise Notes
          </h1>

          <p className="mt-5 text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
            Select a subject and access complete
            study notes, PDFs, handwritten notes,
            formulas and revision material.
          </p>

          {/* SEARCH */}
          <div className="max-w-2xl mx-auto mt-10 relative">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />

            <input
              type="text"
              placeholder="Search subjects..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-black text-lg outline-none shadow-xl"
            />

          </div>

        </div>

      </div>

      {/* FEATURES */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
              <BookOpen className="text-indigo-600" />
            </div>

            <h3 className="font-bold text-lg">
              Detailed Notes
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Topic-wise complete handwritten notes.
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Sparkles className="text-green-600" />
            </div>

            <h3 className="font-bold text-lg">
              Smart Revision
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Quick revision PDFs and formula sheets.
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <FileText className="text-orange-600" />
            </div>

            <h3 className="font-bold text-lg">
              Download PDFs
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Download high-quality notes anytime.
            </p>

          </div>

        </div>

      </div>

      {/* SUBJECT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Available Subjects
            </h2>

            <p className="text-gray-500 mt-2">
              Choose a subject to explore notes.
            </p>

          </div>

          <div className="bg-white px-5 py-3 rounded-xl shadow border text-sm font-medium">
            Total Subjects:{" "}
            <span className="text-indigo-600 font-bold">
              {filteredSubjects.length}
            </span>
          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex justify-center items-center py-24">

            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : filteredSubjects.length === 0 ? (

          <div className="bg-white rounded-3xl shadow p-16 text-center">

            <BookOpen
              size={60}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-2xl font-bold text-gray-700">
              No Subjects Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {filteredSubjects.map((subject, index) => (

              <SubjectCard
                key={index}
                subject={subject}
                index={index}
              />

            ))}

          </div>

        )}

      </div>

      {/* BOTTOM CTA */}
      <div className="bg-white border-t py-14 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Complete Exam Preparation Platform
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Study Notes + Mock Tests + PYQs +
            Daily Quiz + Current Affairs
          </p>

          <button
            onClick={() => navigate("/exams")}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all"
          >
            Explore Test Series
          </button>

        </div>

      </div>

    </div>
  );
};

export default SubjectNotesPage;
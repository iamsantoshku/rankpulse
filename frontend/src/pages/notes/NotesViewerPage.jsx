// import {
//   getNotesBySubject
// } from "../../services/studyNote.service";

// import { useEffect, useState }
// from "react";

// import { useParams }
// from "react-router-dom";

// const NotesViewerPage = () => {

//   const { examId, subject } = useParams();

//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const fetchNotes = async () => {

//     const res =
//       await getNotesBySubject(
//         examId,
//         subject
//       );

//     setNotes(res.data);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <h1 className="text-4xl font-bold mb-10">
//         {subject} Notes
//       </h1>

//       <div className="grid grid-cols-3 gap-6">

//         {notes.map((note) => (

//           <div
//             key={note._id}
//             className="bg-white p-6 rounded-2xl shadow"
//           >

//             <h2 className="text-xl font-bold mb-4">
//               {note.title}
//             </h2>

//             <a
//               href={note.pdfUrl}
//               target="_blank"
//               className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
//             >
//               Open PDF
//             </a>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NotesViewerPage;



import {
  getNotesBySubject
} from "../../services/studyNote.service";

import {
  useEffect,
  useState,
  useMemo
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  FileText,
  Search,
  Download,
  Eye,
  BookOpen,
  ChevronLeft,
  Sparkles,
  FolderOpen
} from "lucide-react";

const NotesViewerPage = () => {

  const { examId, subject } = useParams();

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [examId, subject]);

  const fetchNotes = async () => {

    try {

      setLoading(true);

      const res =
        await getNotesBySubject(
          examId,
          subject
        );

      setNotes(res.data || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  // 🔥 FILTER NOTES
  const filteredNotes = useMemo(() => {

    if (!search.trim()) return notes;

    return notes.filter((note) =>
      note.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [notes, search]);

  // 🔥 FORMAT SUBJECT NAME
  const formattedSubject =
    decodeURIComponent(subject);

  const NoteCard = ({ note, index }) => {

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
        className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-2"
      >

        {/* TOP */}
        <div
          className={`bg-gradient-to-r ${gradient} p-6 relative`}
        >

          <div className="absolute top-0 right-0 opacity-10 text-white text-8xl font-bold">
            PDF
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <FileText size={32} />
          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6">

          <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-3">

            <BookOpen size={16} />

            Study Notes

          </div>

          <h2 className="text-2xl font-bold text-gray-800 line-clamp-2 min-h-[64px]">
            {note.title}
          </h2>

          <p className="text-sm text-gray-500 mt-3">
            High-quality PDF notes for quick revision,
            concepts and exam preparation.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-6">

            {/* VIEW */}
            <a
              href={note.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
            >

              <Eye size={18} />

              Open

            </a>

            {/* DOWNLOAD */}
            <a
              href={note.pdfUrl}
              download
              className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
            >

              <Download size={18} />

              Download

            </a>

          </div>

        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white py-16 px-6">

        <div className="max-w-7xl mx-auto">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl transition-all"
          >

            <ChevronLeft size={20} />

            Back

          </button>

          {/* HEADER */}
          <div className="text-center">

            <div className="flex justify-center mb-5">

              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <FolderOpen size={42} />
              </div>

            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold capitalize">
              {formattedSubject} Notes
            </h1>

            <p className="mt-5 text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto">
              Access handwritten notes, PDFs,
              formulas, revision sheets and
              important concepts.
            </p>

          </div>

          {/* SEARCH */}
          <div className="max-w-2xl mx-auto mt-10 relative">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={22}
            />

            <input
              type="text"
              placeholder="Search notes..."
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
              <FileText className="text-indigo-600" />
            </div>

            <h3 className="font-bold text-lg">
              Premium PDF Notes
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Clean and structured exam-oriented notes.
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <Sparkles className="text-green-600" />
            </div>

            <h3 className="font-bold text-lg">
              Quick Revision
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Smart revision sheets and formula notes.
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-lg transition">

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <Download className="text-orange-600" />
            </div>

            <h3 className="font-bold text-lg">
              Download Anytime
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Save PDFs offline and study anytime.
            </p>

          </div>

        </div>

      </div>

      {/* NOTES SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Available Notes
            </h2>

            <p className="text-gray-500 mt-2">
              Explore all PDFs for this subject.
            </p>

          </div>

          <div className="bg-white px-5 py-3 rounded-xl shadow border text-sm font-medium">

            Total Notes:{" "}

            <span className="text-indigo-600 font-bold">
              {filteredNotes.length}
            </span>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex justify-center items-center py-24">

            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : filteredNotes.length === 0 ? (

          <div className="bg-white rounded-3xl shadow p-16 text-center">

            <FileText
              size={60}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-2xl font-bold text-gray-700">
              No Notes Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {filteredNotes.map((note, index) => (

              <NoteCard
                key={note._id}
                note={note}
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
            Prepare Smarter with RankPulse
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Notes + PYQs + Mock Tests + Daily Quiz +
            Current Affairs
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

export default NotesViewerPage;
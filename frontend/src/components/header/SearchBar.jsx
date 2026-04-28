// import { useState } from "react";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");

//   return (
//     <div className="w-full max-w-md">
//       <input
//         type="text"
//         placeholder="Search for exams, tests..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default SearchBar;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExams } from "../../services/test.service";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await getExams();
      setExams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 SMART SEARCH FUNCTION
  const handleSearch = (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const lower = value.toLowerCase();

    // 🔥 ADVANCED FILTER (better than includes)
    const filtered = exams
      .map((exam) => {
        const title = exam.title.toLowerCase();

        // scoring system
        let score = 0;

        if (title.startsWith(lower)) score += 3; // best match
        if (title.includes(lower)) score += 2;
        if (title.split(" ").some(word => word.startsWith(lower))) score += 1;

        return { ...exam, score };
      })
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // limit results

    setResults(filtered);
  };

  return (
    <div className="relative w-full max-w-md">

      {/* INPUT */}
      <input
        type="text"
        placeholder="Search for exams, tests..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* 🔥 DROPDOWN RESULTS */}
      {results.length > 0 && (
        <div className="absolute w-full bg-white border mt-2 rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto">

          {results.map((exam) => (
            <div
              key={exam._id}
              onClick={() => {
                navigate(`/exam/${exam.slug}`);
                setQuery("");
                setResults([]);
              }}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            >
              <img
                src={exam.logo || "https://via.placeholder.com/40"}
                alt={exam.title}
                className="w-8 h-8 object-contain"
              />

              <span className="text-sm text-gray-700">
                {exam.title}
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default SearchBar;
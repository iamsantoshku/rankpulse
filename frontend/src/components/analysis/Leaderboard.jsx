

// import { useEffect, useState } from "react";
// import { getLeaderboard } from "../../services/test.service";

// const Leaderboard = ({ testId }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (testId) {
//       fetchLeaderboard();
//     }
//   }, [testId]);

//   const fetchLeaderboard = async () => {
//     try {
//       const res = await getLeaderboard(testId);
//       setData(res.data);
//     } catch (err) {
//       console.error("Leaderboard Error:", err);
//     }
//   };

//   if (!testId) {
//     return <p className="text-center text-gray-500">Loading leaderboard...</p>;
//   }

//   return (
//     <div className="mt-8 bg-white rounded-xl shadow p-6">

//       <h2 className="text-xl font-bold mb-6 text-center">
//         🏆 Leaderboard
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="w-full">

//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3">Rank</th>
//               <th>Name</th>
//               <th>Score</th>
//               <th>Accuracy</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center p-4">
//                   No attempts yet
//                 </td>
//               </tr>
//             ) : (
//               data.map((item, i) => (
//                 <tr key={item._id} className="border text-center">

//                   <td className="p-3 font-bold">
//                     {i === 0 ? "🥇" :
//                      i === 1 ? "🥈" :
//                      i === 2 ? "🥉" : i + 1}
//                   </td>

//                   <td>{item.user?.name || "User"}</td>
//                   <td>{item.score}</td>
//                   <td>{item.accuracy?.toFixed(1)}%</td>

//                 </tr>
//               ))
//             )}
//           </tbody>

//         </table>
//       </div>

//     </div>
//   );
// };

// export default Leaderboard;



import { useEffect, useState, useContext } from "react";
import { getLeaderboard } from "../../services/test.service";
import { AuthContext } from "../../context/AuthContext";

const Leaderboard = ({ testId }) => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (testId) {
      fetchLeaderboard();
    }
  }, [testId]);

  const fetchLeaderboard = async () => {
    try {
      const res = await getLeaderboard(testId);
      setData(res.data);
    } catch (err) {
      console.error("Leaderboard Error:", err);
    }
  };

  if (!testId) {
    return <p className="text-center text-gray-500">Loading leaderboard...</p>;
  }

  const currentUser = data.find(
    (d) => d.user?._id === user?._id
  );

  const PodiumCard = ({ user, position, big }) => {
  if (!user) return null;

  return (
    <div
      className={`flex flex-col items-center ${
        big ? "scale-110" : ""
      }`}
    >
      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
        {user.user?.name?.charAt(0)}
      </div>

      <p className="mt-2 font-semibold text-sm">
        {user.user?.name}
      </p>

      <p className="text-xs text-gray-500">
        {user.score} marks
      </p>

      <div className="mt-2 text-lg font-bold">
        #{position}
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  if (!seconds) return "--";

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

  return (
    <div className="mt-10">

      {/* 🔥 PODIUM (TOP 3) */}
      {data.length >= 3 && (
        <div className="flex justify-center items-end gap-6 mb-10">

          {/* 2nd */}
          <PodiumCard user={data[1]} position="2" />

          {/* 1st */}
          <PodiumCard user={data[0]} position="1" big />

          {/* 3rd */}
          <PodiumCard user={data[2]} position="3" />

        </div>
      )}

      {/* 🔥 USER RANK CARD */}
      {currentUser && (
        <div className="bg-indigo-100 border border-indigo-300 p-4 rounded-lg mb-6 text-center">
          <h3 className="font-bold text-lg">
            Your Rank: #{currentUser.rank} / {currentUser.totalParticipants}
          </h3>

          <p className="text-sm">
            Percentile: {currentUser.percentile}%
          </p>
        </div>
      )}

      {/* 🔥 TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <h2 className="text-xl font-bold p-4 text-center">
          🏆 Leaderboard
        </h2>

        <table className="w-full text-sm">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Accuracy</th>
              <th>Time</th>
              <th>Percentile</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => {
              const isMe = item.user?._id === user?._id;

              return (
                <tr
                  key={item._id}
                  className={`text-center border ${
                    isMe ? "bg-yellow-100 font-semibold" : ""
                  }`}
                >

                  {/* Rank */}
                  <td className="p-3 font-bold">
                    {i === 0 ? "🥇" :
                     i === 1 ? "🥈" :
                     i === 2 ? "🥉" : item.rank}
                  </td>

                  {/* Name */}
                  <td>{item.user?.name || "User"}</td>

                  {/* Score */}
                  <td>{item.score}</td>

                  {/* Accuracy */}
                  <td>{item.accuracy?.toFixed(1)}%</td>

                  {/* Time */}
                  <td>{formatTime(item.timeTaken)}</td>

                  {/* Percentile */}
                  <td>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                      {item.percentile}%
                    </span>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
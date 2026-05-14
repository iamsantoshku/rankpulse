



// import { useEffect, useState, useContext } from "react";
// import { getLeaderboard } from "../../services/test.service";
// import { AuthContext } from "../../context/AuthContext";

// const Leaderboard = ({ testId }) => {
//   const [data, setData] = useState([]);
//   const { user } = useContext(AuthContext);

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

//   const currentUser = data.find(
//     (d) => d.user?._id === user?._id
//   );

//   const PodiumCard = ({ user, position, big }) => {
//   if (!user) return null;

//   return (
//     <div
//       className={`flex flex-col items-center ${
//         big ? "scale-110" : ""
//       }`}
//     >
//       <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
//         {user.user?.name?.charAt(0)}
//       </div>

//       <p className="mt-2 font-semibold text-sm">
//         {user.user?.name}
//       </p>

//       <p className="text-xs text-gray-500">
//         {user.score} marks
//       </p>

//       <div className="mt-2 text-lg font-bold">
//         #{position}
//       </div>
//     </div>
//   );
// };

// const formatTime = (seconds) => {
//   if (!seconds) return "--";

//   const m = Math.floor(seconds / 60);
//   const s = seconds % 60;

//   return `${m}:${s < 10 ? "0" : ""}${s}`;
// };

//   return (
//     <div className="mt-10">

//       {/* 🔥 PODIUM (TOP 3) */}
//       {data.length >= 3 && (
//         <div className="flex justify-center items-end gap-6 mb-10">

//           {/* 2nd */}
//           <PodiumCard user={data[1]} position="2" />

//           {/* 1st */}
//           <PodiumCard user={data[0]} position="1" big />

//           {/* 3rd */}
//           <PodiumCard user={data[2]} position="3" />

//         </div>
//       )}

//       {/* 🔥 USER RANK CARD */}
//       {currentUser && (
//         <div className="bg-indigo-100 border border-indigo-300 p-4 rounded-lg mb-6 text-center">
//           <h3 className="font-bold text-lg">
//             Your Rank: #{currentUser.rank} / {currentUser.totalParticipants}
//           </h3>

//           <p className="text-sm">
//             Percentile: {currentUser.percentile}%
//           </p>
//         </div>
//       )}

//       {/* 🔥 TABLE */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">

//         <h2 className="text-xl font-bold p-4 text-center">
//           🏆 Leaderboard
//         </h2>

//         <table className="w-full text-sm">

//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3">Rank</th>
//               <th>Name</th>
//               <th>Score</th>
//               <th>Accuracy</th>
//               <th>Time</th>
//               <th>Percentile</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((item, i) => {
//               const isMe = item.user?._id === user?._id;

//               return (
//                 <tr
//                   key={item._id}
//                   className={`text-center border ${
//                     isMe ? "bg-yellow-100 font-semibold" : ""
//                   }`}
//                 >

//                   {/* Rank */}
//                   <td className="p-3 font-bold">
//                     {i === 0 ? "🥇" :
//                      i === 1 ? "🥈" :
//                      i === 2 ? "🥉" : item.rank}
//                   </td>

//                   {/* Name */}
//                   <td>{item.user?.name || "User"}</td>

//                   {/* Score */}
//                   <td>{item.score}</td>

//                   {/* Accuracy */}
//                   <td>{item.accuracy?.toFixed(1)}%</td>

//                   {/* Time */}
//                   <td>{formatTime(item.timeTaken)}</td>

//                   {/* Percentile */}
//                   <td>
//                     <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
//                       {item.percentile}%
//                     </span>
//                   </td>

//                 </tr>
//               );
//             })}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;





// ============================================
// 📁 src/components/analysis/Leaderboard.jsx
// ============================================

import {
  useEffect,
  useState,
  useContext
} from "react";

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
      const res =
        await getLeaderboard(testId);

      setData(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const currentUser = data.find(
    (d) => d.user?._id === user?._id
  );

  const formatTime = (seconds) => {
    if (!seconds) return "--";

    const mins = Math.floor(
      seconds / 60
    );

    const secs = seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const PodiumCard = ({
    item,
    rank,
    big,
    bg
  }) => {
    if (!item) return null;

    return (
      <div
        className={`flex flex-col items-center ${
          big ? "scale-110" : ""
        }`}
      >

        <div
          className={`${bg} w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white`}
        >
          {item.user?.name?.charAt(0)}
        </div>

        <h3 className="mt-4 font-bold text-lg">
          {item.user?.name}
        </h3>

        <p className="text-sm text-gray-500">
          {item.score} Marks
        </p>

        <div className="mt-3 bg-black text-white px-4 py-1 rounded-full font-bold">
          #{rank}
        </div>

      </div>
    );
  };

  return (
    <div className="mt-10">

      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">

          <h2 className="text-3xl font-bold text-center">
            🏆 Global Leaderboard
          </h2>

          <p className="text-center mt-2 text-indigo-100">
            Compete with top performers
          </p>

        </div>

        {/* PODIUM */}
        {data.length >= 3 && (
          <div className="flex justify-center items-end gap-6 py-10 bg-gradient-to-b from-yellow-50 to-white">

            <PodiumCard
              item={data[1]}
              rank={2}
              bg="bg-gray-300"
            />

            <PodiumCard
              item={data[0]}
              rank={1}
              bg="bg-yellow-400"
              big
            />

            <PodiumCard
              item={data[2]}
              rank={3}
              bg="bg-orange-300"
            />

          </div>
        )}

        {/* USER RANK */}
        {currentUser && (
          <div className="mx-6 mb-6 bg-indigo-50 border border-indigo-200 rounded-2xl p-5">

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

              <div>
                <h3 className="text-xl font-bold text-indigo-700">
                  Your Performance
                </h3>

                <p className="text-gray-600">
                  Keep improving your rank
                </p>
              </div>

              <div className="flex gap-4 flex-wrap">

                <div className="bg-white px-5 py-3 rounded-xl shadow">
                  <p className="text-sm text-gray-500">
                    Rank
                  </p>

                  <h3 className="text-2xl font-bold">
                    #{currentUser.rank}
                  </h3>
                </div>

                <div className="bg-white px-5 py-3 rounded-xl shadow">
                  <p className="text-sm text-gray-500">
                    Percentile
                  </p>

                  <h3 className="text-2xl font-bold text-green-600">
                    {
                      currentUser.percentile
                    }
                    %
                  </h3>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr className="text-left">

                <th className="p-4">
                  Rank
                </th>

                <th className="p-4">
                  User
                </th>

                <th className="p-4">
                  Score
                </th>

                <th className="p-4">
                  Accuracy
                </th>

                <th className="p-4">
                  Time
                </th>

                <th className="p-4">
                  Percentile
                </th>

              </tr>

            </thead>

            <tbody>

              {data.map((item, index) => {
                const isMe =
                  item.user?._id ===
                  user?._id;

                return (
                  <tr
                    key={item._id}
                    className={`border-b transition hover:bg-gray-50 ${
                      isMe
                        ? "bg-yellow-50"
                        : ""
                    }`}
                  >

                    {/* RANK */}
                    <td className="p-4 font-bold text-lg">

                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : item.rank}

                    </td>

                    {/* USER */}
                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">

                          {item.user?.name?.charAt(
                            0
                          )}

                        </div>

                        <div>
                          <p className="font-semibold">
                            {
                              item.user?.name
                            }
                          </p>

                          {isMe && (
                            <p className="text-xs text-indigo-600">
                              You
                            </p>
                          )}
                        </div>

                      </div>

                    </td>

                    {/* SCORE */}
                    <td className="p-4 font-bold text-green-600">
                      {item.score}
                    </td>

                    {/* ACCURACY */}
                    <td className="p-4">
                      <div className="w-28">

                        <div className="flex justify-between text-xs mb-1">
                          <span>
                            {item.accuracy?.toFixed(
                              1
                            )}
                            %
                          </span>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full">

                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{
                              width: `${item.accuracy}%`
                            }}
                          ></div>

                        </div>
                      </div>
                    </td>

                    {/* TIME */}
                    <td className="p-4">
                      {formatTime(
                        item.timeTaken
                      )}
                    </td>

                    {/* PERCENTILE */}
                    <td className="p-4">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                        {
                          item.percentile
                        }
                        %

                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
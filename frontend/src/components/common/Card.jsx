// const Card = ({ title, icon }) => {
//   return (
//     <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-md cursor-pointer">
//       <div className="text-3xl">{icon}</div>
//       <h3 className="text-lg font-semibold">{title}</h3>
//     </div>
//   );
// };

// export default Card;



import { useNavigate } from "react-router-dom";

const Card = ({ title, icon, path }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => path && navigate(path)}
      className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-center cursor-pointer
                 hover:shadow-xl hover:scale-105 transition duration-300 border"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-sm font-semibold text-gray-700 text-center">
        {title}
      </h3>
    </div>
  );
};

export default Card;
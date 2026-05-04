import { useNavigate } from "react-router-dom";
import Card from "../common/Card";

const CurrentAffairs = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6">
      
      {/* Heading */}
      <h2
        onClick={() => navigate("/current-affairs")}
        className="text-xl font-bold mb-4 cursor-pointer hover:text-indigo-600"
      >
        📢 Current Affairs Updates
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">

        <div onClick={() => navigate("/current-affairs")} className="cursor-pointer">
          <Card title="Daily Current Affairs" icon="📰" />
        </div>

        <div onClick={() => navigate("/current-affairs")} className="cursor-pointer">
          <Card title="CA Monthly Magazine" icon="📘" />
        </div>

      </div>
    </div>
  );
};

export default CurrentAffairs;
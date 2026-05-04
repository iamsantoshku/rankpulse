const SummaryBox = ({ label, value, color }) => {
  const colors = {
    green: "text-green-600",
    red: "text-red-500",
    blue: "text-blue-500"
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-semibold ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
};
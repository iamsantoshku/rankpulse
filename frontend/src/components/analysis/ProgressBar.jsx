const ProgressBar = ({ label, value, total, color }) => {
  const percent = (value / total) * 100;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className={`${color} h-2 rounded`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
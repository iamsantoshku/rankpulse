const CircleCard = ({ title, value, total, color, suffix = "" }) => {
  const percentage = (value / total) * 100;
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  const colors = {
    blue: "stroke-blue-500",
    green: "stroke-green-500",
    orange: "stroke-orange-500"
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <svg height={radius * 2} width={radius * 2} className="mx-auto">
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="currentColor"
          className={colors[color]}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <h3 className="text-lg font-bold mt-2">
        {value}{suffix}
      </h3>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
};
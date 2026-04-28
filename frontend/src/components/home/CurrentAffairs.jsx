import Card from "../common/Card";

const CurrentAffairs = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">📢 Current Affairs Updates</h2>

      <div className="grid grid-cols-2 gap-4">
        <Card title="Daily Current Affairs" icon="📰" />
        <Card title="CA Monthly Magazine" icon="📘" />
      </div>
    </div>
  );
};

export default CurrentAffairs;
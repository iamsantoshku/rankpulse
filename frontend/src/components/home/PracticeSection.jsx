// import Card from "../common/Card";

// const PracticeSection = () => {
//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-bold mb-4">🧠 Online Practice</h2>

//       <div className="grid grid-cols-3 gap-4">
//         <Card title="Mock Tests" icon="📝"  path="/exams"/>
//         <Card title="Daily Quiz" icon="❓" />
//         <Card title="Typing Test" icon="⌨️" />
//       </div>
//     </div>
//   );
// };

// export default PracticeSection;



import Card from "../common/Card";

const PracticeSection = () => {
  return (
    <div className="mt-10 px-4">
      
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        🧠 Online Practice
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        <Card
          title="Mock Tests"
          icon="📝"
          path="/exams"   // ✅ NOW WORKS
        />

        <Card
          title="Daily Quiz"
          icon="❓"
          path="/quiz"
        />

        <Card
          title="Typing Test"
          icon="⌨️"
          path="/typing"
        />

      </div>
    </div>
  );
};

export default PracticeSection;
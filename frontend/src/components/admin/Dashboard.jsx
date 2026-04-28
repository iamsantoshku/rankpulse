import AdminLayout from "../admin/AdminLayout";

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">Users: 120</div>
        <div className="bg-white p-4 rounded shadow">Tests: 45</div>
        <div className="bg-white p-4 rounded shadow">Revenue: ₹50K</div>
        <div className="bg-white p-4 rounded shadow">Attempts: 300</div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;







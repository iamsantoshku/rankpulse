import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      
      <AdminSidebar />

      <div className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;
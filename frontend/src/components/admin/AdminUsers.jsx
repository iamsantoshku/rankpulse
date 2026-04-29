import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/test.service";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">👥 All Users</h2>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      {u.name?.charAt(0)}
                    </div>
                    {u.name}
                  </td>

                  <td className="p-3">{u.email}</td>

                  <td className="p-3">
                    <Link
                      to={`/admin/user/${u._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Performance →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AdminUsers;
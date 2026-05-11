
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [payments, setPayments] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5050/api/payment/my-payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayments(res.data || []);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    } finally {
      setLoadingPayments(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await axios.put(
        "http://localhost:5050/api/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully");
      window.location.reload(); // optional: replace with context update
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isSubscribed =
    user?.subscription?.isActive &&
    new Date(user.subscription.expiryDate) > new Date();

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>

            <div className="mt-3 inline-flex items-center px-4 py-1 rounded-full text-sm font-medium">
              {isSubscribed ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Premium Active
                </span>
              ) : (
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Free User
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>

          {isSubscribed ? (
            <div className="space-y-3">
              <p>
                <span className="font-medium">Plan:</span>{" "}
                {user.subscription?.plan || "Monthly"}
              </p>
              <p>
                <span className="font-medium">Expires:</span>{" "}
                {new Date(
                  user.subscription.expiryDate
                ).toLocaleDateString()}
              </p>
              <button
                onClick={() => navigate("/test-series")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
              >
                Continue Learning
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Upgrade to Premium to unlock all mock tests.
              </p>
              <button
                onClick={() => navigate("/pricing")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
              >
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>

        {loadingPayments ? (
          <p>Loading payments...</p>
        ) : payments.length === 0 ? (
          <p className="text-gray-500">No payments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Plan</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b">
                    <td className="py-3">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">{payment.plan || "Monthly"}</td>
                    <td className="py-3">₹{payment.amount}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;


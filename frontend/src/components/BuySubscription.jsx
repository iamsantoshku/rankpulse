// import { createOrder, verifyPayment } from "../services/test.service";

// const BuySubscription = () => {

//   const handlePayment = async () => {
//     try {
//       // 1️⃣ Create Order
//       const { data } = await createOrder(499);

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY, // frontend key
//         amount: data.amount,
//         currency: data.currency,
//         name: "RankPulse",
//         description: "Premium Subscription",
//         order_id: data.id,

//         handler: async function (response) {
//           // 2️⃣ VERIFY PAYMENT
//           await verifyPayment(response);

//           alert("✅ Payment Successful");
//           window.location.reload();
//         },

//         theme: {
//           color: "#4f46e5"
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.error(err);
//       alert("Payment failed");
//     }
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       className="bg-green-600 text-white px-6 py-3 rounded-lg"
//     >
//       Buy Premium ₹499
//     </button>
//   );
// };

// export default BuySubscription;




import { useState } from "react";
import { createOrder, verifyPayment } from "../services/test.service";

const BuySubscription = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("monthly");

  const handlePayment = async () => {
    try {
      setLoading(true);

      // ✅ Create order with plan
      const { data } = await createOrder({ plan });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: "RankPulse",
        description: "Premium Subscription",
        order_id: data.id,

        handler: async function (response) {
          try {
            await verifyPayment({
              ...response,
              plan
            });

            alert("✅ Payment Successful");
            window.location.reload();
          } catch {
            alert("Verification failed");
          }
        },

        prefill: {
          name: "User",
          email: "user@email.com"
        },

        theme: {
          color: "#4f46e5"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Upgrade to Premium 🚀
          </h1>
          <p className="text-gray-500 mt-2">
            Unlock all mock tests, PYQs & detailed analysis
          </p>
        </div>

        {/* PLAN TOGGLE */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-200 p-1 rounded-full flex">
            <button
              onClick={() => setPlan("monthly")}
              className={`px-6 py-2 rounded-full ${
                plan === "monthly"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setPlan("yearly")}
              className={`px-6 py-2 rounded-full ${
                plan === "yearly"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Yearly 🔥
            </button>
          </div>
        </div>

        {/* PRICING CARD */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* FEATURES */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">
              What you get:
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>✅ Unlimited Mock Tests</li>
              <li>✅ Previous Year Papers</li>
              <li>✅ Full Performance Analysis</li>
              <li>✅ All Exams Access</li>
              <li>✅ No Ads Experience</li>
            </ul>
          </div>

          {/* PAYMENT CARD */}
          <div className="bg-indigo-600 text-white p-6 rounded-xl flex flex-col justify-between">

            <div>
              <h2 className="text-2xl font-bold mb-2">
                {plan === "monthly" ? "₹199" : "₹999"}
              </h2>

              <p className="text-indigo-200 mb-6">
                {plan === "monthly"
                  ? "per month"
                  : "per year (save 50%)"}
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>

            <p className="text-xs text-indigo-200 mt-4 text-center">
              Secure payment via Razorpay 🔒
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BuySubscription;



// import { useState } from "react";
// import { createOrder, verifyPayment } from "../services/test.service";

// const BuySubscription = () => {
//   const [loading, setLoading] = useState(false);
//   const [plan, setPlan] = useState("monthly");

//   const handlePayment = async () => {
//     try {
//       setLoading(true);

//       // ✅ SEND CORRECT DATA
//       const { data } = await createOrder({ plan });

//       if (!data?.order) {
//         throw new Error("Order not created");
//       }

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,

//         // ✅ FIXED VALUES
//         amount: data.order.amount,
//         currency: data.order.currency,
//         order_id: data.order.id,

//         name: "RankPulse",
//         description: "Premium Subscription",

//         handler: async function (response) {
//           try {
//             await verifyPayment({
//               ...response,
//               plan
//             });

//             alert("✅ Payment Successful");
//             window.location.reload();
//           } catch (err) {
//             console.error(err);
//             alert("Verification failed");
//           }
//         },

//         prefill: {
//           name: "User",
//           email: "user@email.com"
//         },

//         theme: {
//           color: "#4f46e5"
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.error("Payment Error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8">

//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Upgrade to Premium 🚀
//           </h1>
//           <p className="text-gray-500 mt-2">
//             Unlock all mock tests, PYQs & detailed analysis
//           </p>
//         </div>

//         <div className="flex justify-center mb-8">
//           <div className="bg-gray-200 p-1 rounded-full flex">
//             <button
//               onClick={() => setPlan("monthly")}
//               className={`px-6 py-2 rounded-full ${
//                 plan === "monthly"
//                   ? "bg-indigo-600 text-white"
//                   : "text-gray-600"
//               }`}
//             >
//               Monthly
//             </button>

//             <button
//               onClick={() => setPlan("yearly")}
//               className={`px-6 py-2 rounded-full ${
//                 plan === "yearly"
//                   ? "bg-indigo-600 text-white"
//                   : "text-gray-600"
//               }`}
//             >
//               Yearly 🔥
//             </button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">

//           <div className="bg-gray-50 p-6 rounded-xl">
//             <h3 className="text-xl font-semibold mb-4">
//               What you get:
//             </h3>

//             <ul className="space-y-3 text-gray-700">
//               <li>✅ Unlimited Mock Tests</li>
//               <li>✅ Previous Year Papers</li>
//               <li>✅ Full Performance Analysis</li>
//               <li>✅ All Exams Access</li>
//               <li>✅ No Ads Experience</li>
//             </ul>
//           </div>

//           <div className="bg-indigo-600 text-white p-6 rounded-xl flex flex-col justify-between">

//             <div>
//               <h2 className="text-2xl font-bold mb-2">
//                 {plan === "monthly" ? "₹199" : "₹999"}
//               </h2>

//               <p className="text-indigo-200 mb-6">
//                 {plan === "monthly"
//                   ? "per month"
//                   : "per year (save 50%)"}
//               </p>
//             </div>

//             <button
//               onClick={handlePayment}
//               disabled={loading}
//               className="bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
//             >
//               {loading ? "Processing..." : "Buy Now"}
//             </button>

//             <p className="text-xs text-indigo-200 mt-4 text-center">
//               Secure payment via Razorpay 🔒
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuySubscription;



// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Suspense, lazy, useContext } from "react";
// import { AuthContext, AuthProvider } from "./context/AuthContext";
// import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
// import InstallApp from "./components/InstallApp";

// // 🔥 Lazy Loading (Code Splitting)
// const Home = lazy(() => import("./pages/Home"));
// const Login = lazy(() => import("./pages/Login"));
// const Register = lazy(() => import("./pages/Register"));
// const AllExam = lazy(() => import("./pages/AllExam"));
// const TestSeriesList = lazy(() => import("./components/exams/TestSeriesList"));
// const InstructionsPage = lazy(() => import("./pages/InstructionsPage"));
// const TestEngine = lazy(() => import("./pages/TestEngine"));
// const ResultPage = lazy(() => import("./pages/ResultPage"));
// const ReviewPage = lazy(() => import("./pages/ReviewPage"));
// const AttemptList = lazy(() => import("./pages/AttemptList"));
// const SolutionPage = lazy(() => import("./pages/SolutionPage"));
// const AnalysisPage = lazy(() => import("./pages/AnalysisPage"));
// const CurrentAffairs = lazy(() => import("./pages/CurrentAffairs"));
// const CurrentAffairDetails = lazy(() => import("./pages/CurrentAffairDetails"));
// const BuySubscription = lazy(() => import("./components/BuySubscription"));
// const ProfilePage = lazy(() => import("./pages/ProfilePage"));

// // Admin
// const Dashboard = lazy(() => import("./components/admin/Dashboard"));
// const CreateExam = lazy(() => import("./components/admin/CreateExam"));
// const CreateTestSeries = lazy(() => import("./components/admin/CreateTestSeries"));
// const CreatePYP = lazy(() => import("./components/admin/CreatePYP"));
// const CreateTest = lazy(() => import("./components/admin/CreateTest"));
// const CreateQuestion = lazy(() => import("./components/admin/CreateQuestion"));
// const AdminUsers = lazy(() => import("./components/admin/AdminUsers"));
// const UserPerformance = lazy(() => import("./components/admin/UserPerformance"));
// const AddQuestionBulk = lazy(() => import("./components/admin/AddQuestionBulk"));
// const AdminGenerateCA = lazy(() => import("./components/admin/AdminGenerateCA"));


// // Layout
// import Header from "./components/Header";
// // import BuySubscription from "./components/BuySubscription";
// // import AdminGenerateCA from "./components/admin/AdminGenerateCA";
// // import CurrentAffair from "../../backend/models/CurrentAffair";
// // import CurrentAffairs from "./pages/CurrentAffairs";
// // import CurrentAffairDetails from "./pages/CurrentAffairDetails";


// // 🔥 Loader Component (Better UX)
// const Loader = () => (
//   <div className="h-screen flex items-center justify-center">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
//   </div>
// );


// // 🔥 Layout Wrapper (Header Control)
// const Layout = ({ children }) => {
//   return (
//     <>
//       <Header />
//       {children}
//     </>
//   );
// };


// // 🔥 Hide Header for Test Engine (Full Screen)
// const TestLayout = ({ children }) => {
//   return <>{children}</>;
// };


// function AppContent() {
//   const { loading } = useContext(AuthContext);

//   if (loading) return <Loader />;

//   return (
//     <BrowserRouter>
//       <InstallApp />

//       <Suspense fallback={<Loader />}>
//         <Routes>

//           {/* PUBLIC ROUTES */}
//           <Route path="/" element={<Layout><Home /></Layout>} />
//           <Route path="/login" element={<Layout><Login /></Layout>} />
//           <Route path="/register" element={<Layout><Register /></Layout>} />
//           <Route path="/exams" element={<Layout><AllExam /></Layout>} />
//           <Route path="/exam/:slug" element={<Layout><TestSeriesList /></Layout>} />

//           {/* TEST FLOW (NO HEADER) */}
//           <Route path="/instructions/:testId" element={<TestLayout><InstructionsPage /></TestLayout>} />
//           <Route path="/start-test/:testId" element={<TestLayout><TestEngine /></TestLayout>} />
//           <Route path="/result/:attemptId" element={<TestLayout><ResultPage /></TestLayout>} />
//           <Route path="/review/:attemptId" element={<TestLayout><ReviewPage /></TestLayout>} />
//           <Route path="/attempt-analysis" element={<TestLayout><AttemptList /></TestLayout>} />
//           <Route path="/solution/:attemptId" element={<TestLayout><SolutionPage /></TestLayout>} />
//           <Route path="/analysis/:attemptId" element={<TestLayout><AnalysisPage /></TestLayout>} />
//           <Route path="/current-affairs" element={<TestLayout><CurrentAffairs /></TestLayout>} />
//           <Route path="/ca/:idcurrent-affairs" element={<TestLayout><CurrentAffairDetails /></TestLayout>} />
//           <Route path="/pricing" element={<TestLayout><BuySubscription /></TestLayout>} />
//           <Route path="/profile" element={<TestLayout><ProfilePage /></TestLayout>} />

//           {/* <Route path="/current-affairs" element={<CurrentAffairs />} /><.   Route path="/ca/:id" element={<CurrentAffairDetails />} /> */}



//           {/* ADMIN ROUTES */}
//           <Route path="/admin/dashboard" element={
//             <ProtectedAdminRoute>
//               <Layout><Dashboard /></Layout>
//             </ProtectedAdminRoute>
//           } />

//           <Route path="/admin/add-exam" element={
//             <ProtectedAdminRoute>
//               <Layout><CreateExam /></Layout>
//             </ProtectedAdminRoute>
//           } />

//           <Route path="/admin/add-test-series" element={
//             <ProtectedAdminRoute>
//               <Layout><CreateTestSeries /></Layout>
//             </ProtectedAdminRoute>
//           } />

//           <Route path="/admin/add-pyp" element={
//             <ProtectedAdminRoute>
//               <Layout><CreatePYP /></Layout>
//             </ProtectedAdminRoute>
//           } />

//           <Route path="/admin/create-test" element={
//             <ProtectedAdminRoute>
//               <Layout><CreateTest /></Layout>
//             </ProtectedAdminRoute>
//           } />

//           <Route path="/admin/add-question" element={
//             <ProtectedAdminRoute>
//               <Layout><CreateQuestion /></Layout>
//             </ProtectedAdminRoute>
//           } />

//             <Route path="/admin/add-question-bulk" element={
//             <ProtectedAdminRoute>
//               <Layout><AddQuestionBulk /></Layout>
//             </ProtectedAdminRoute>
//           } />

//           {/* <Route path="/admin/add-question-bulk" element={<AddQuestionBulk />} /> */}

//           <Route path="/admin/users" element={
//             <ProtectedAdminRoute>
//               <Layout><AdminUsers /></Layout>
//             </ProtectedAdminRoute>
//           } />

//           <Route path="/admin/user/:id" element={
//             <ProtectedAdminRoute>
//               <Layout><UserPerformance /></Layout>
//             </ProtectedAdminRoute>
//           } />

//            <Route path="/admin/add-current-affairs" element={
//             <ProtectedAdminRoute>
//               <Layout><AdminGenerateCA /></Layout>
//             </ProtectedAdminRoute>
//           } />

//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// }


// // 🔥 ROOT APP
// function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// export default App;

















import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";

import { AuthContext, AuthProvider } from "./context/AuthContext";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import InstallApp from "./components/InstallApp";
import Header from "./components/Header";


// ================= LAZY IMPORTS =================

// Public
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AllExam = lazy(() => import("./pages/AllExam"));
const TestSeriesList = lazy(() => import("./components/exams/TestSeriesList"));

const CurrentAffairs = lazy(() => import("./pages/CurrentAffairs"));
const CurrentAffairDetails = lazy(() => import("./pages/CurrentAffairDetails"));

const BuySubscription = lazy(() => import("./components/BuySubscription"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));


// Test Flow
const InstructionsPage = lazy(() => import("./pages/InstructionsPage"));
const TestEngine = lazy(() => import("./pages/TestEngine"));
const ResultPage = lazy(() => import("./pages/ResultPage"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const AttemptList = lazy(() => import("./pages/AttemptList"));
const SolutionPage = lazy(() => import("./pages/SolutionPage"));
const AnalysisPage = lazy(() => import("./pages/AnalysisPage"));


// Admin
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const CreateExam = lazy(() => import("./components/admin/CreateExam"));
const CreateTestSeries = lazy(() => import("./components/admin/CreateTestSeries"));
const CreatePYP = lazy(() => import("./components/admin/CreatePYP"));
const CreateTest = lazy(() => import("./components/admin/CreateTest"));
const CreateQuestion = lazy(() => import("./components/admin/CreateQuestion"));
const AddQuestionBulk = lazy(() => import("./components/admin/AddQuestionBulk"));
const AdminUsers = lazy(() => import("./components/admin/AdminUsers"));
const UserPerformance = lazy(() => import("./components/admin/UserPerformance"));
const AdminGenerateCA = lazy(() => import("./components/admin/AdminGenerateCA"));


// Extra
const NotFound = lazy(() => import("./pages/NotFound"));


// ================= LOADER =================

const Loader = () => (
  <div className="h-screen flex items-center justify-center bg-white">
    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);


// ================= LAYOUTS =================

const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

const TestLayout = ({ children }) => (
  <div className="bg-gray-100 min-h-screen">
    {children}
  </div>
);


// ================= APP CONTENT =================

const AppContent = () => {
  const { loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return (
    <>
      <InstallApp />

      <Suspense fallback={<Loader />}>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}

          <Route
            path="/"
            element={<MainLayout><Home /></MainLayout>}
          />

          <Route
            path="/login"
            element={<MainLayout><Login /></MainLayout>}
          />

          <Route
            path="/register"
            element={<MainLayout><Register /></MainLayout>}
          />

          <Route
            path="/exams"
            element={<MainLayout><AllExam /></MainLayout>}
          />

          <Route
            path="/exam/:slug"
            element={<MainLayout><TestSeriesList /></MainLayout>}
          />

          <Route
            path="/current-affairs"
            element={<MainLayout><CurrentAffairs /></MainLayout>}
          />

          <Route
            path="/ca/:id"
            element={<MainLayout><CurrentAffairDetails /></MainLayout>}
          />

          <Route
            path="/pricing"
            element={<MainLayout><BuySubscription /></MainLayout>}
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout><ProfilePage /></MainLayout>
              </ProtectedRoute>
            }
          />



          {/* ================= TEST FLOW ================= */}

          <Route
            path="/instructions/:testId"
            element={
              <ProtectedRoute>
                <TestLayout><InstructionsPage /></TestLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/start-test/:testId"
            element={
              <ProtectedRoute>
                <TestLayout><TestEngine /></TestLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/result/:attemptId"
            element={
              <ProtectedRoute>
                <TestLayout><ResultPage /></TestLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/review/:attemptId"
            element={
              <ProtectedRoute>
                <TestLayout><ReviewPage /></TestLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/attempt-analysis"
            element={
              <ProtectedRoute>
                <TestLayout><AttemptList /></TestLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/solution/:attemptId"
            element={
              <ProtectedRoute>
                <TestLayout><SolutionPage /></TestLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analysis/:attemptId"
            element={
              <ProtectedRoute>
                <TestLayout><AnalysisPage /></TestLayout>
              </ProtectedRoute>
            }
          />



          {/* ================= ADMIN ROUTES ================= */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <MainLayout><Dashboard /></MainLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-exam"
            element={
              <ProtectedAdminRoute>
                <MainLayout><CreateExam /></MainLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-test-series"
            element={
              <ProtectedAdminRoute>
                <MainLayout><CreateTestSeries /></MainLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-pyp"
            element={
              <ProtectedAdminRoute>
                <MainLayout><CreatePYP /></MainLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/create-test"
            element={
              <ProtectedAdminRoute>
                <MainLayout><CreateTest /></MainLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-question"
            element={
              <ProtectedAdminRoute>
                <MainLayout><CreateQuestion /></MainLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-question-bulk"
            element={
              <ProtectedAdminRoute>
                <MainLayout><AddQuestionBulk /></MainLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <MainLayout><AdminUsers /></MainLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/user/:id"
            element={
              <ProtectedAdminRoute>
                <MainLayout><UserPerformance /></MainLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-current-affairs"
            element={
              <ProtectedAdminRoute>
                <MainLayout><AdminGenerateCA /></MainLayout>
              </ProtectedAdminRoute>
            }
          />



          {/* ================= 404 ================= */}

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </>
  );
};


// ================= ROOT APP =================

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
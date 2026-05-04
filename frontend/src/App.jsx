
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import Header from "./components/Header";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
// import Dashboard from "./components/admin/Dashboard";
// import CreateExam from "./components/admin/CreateExam";
// import AllExam from "./pages/AllExam";
// import CreateTestSeries from "./components/admin/CreateTestSeries";
// import CreatePYP from "./components/admin/CreatePYP";
// import TestSeriesList from "./components/exams/TestSeriesList";
// import CreateQuestion from "./components/admin/CreateQuestion";
// import CreateTest from "./components/admin/CreateTest";
// import InstructionsPage from "./pages/InstructionsPage";
// import TestEngine from "./pages/TestEngine";
// import ResultPage from "./pages/ResultPage";
// import ReviewPage from "./pages/ReviewPage";
// import InstallApp from "./components/InstallApp";
// import AdminUsers from "./components/admin/AdminUsers";
// import UserPerformance from "./components/admin/UserPerformance";
// function App() {

//   const { loading } = useContext(AuthContext);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <AuthProvider>
//       <BrowserRouter>
//       <InstallApp />
         
//         <Header />
//         <Routes>
          

//           <Route
//   path="/admin/dashboard"
//   element={
//     <ProtectedAdminRoute>
//       <Dashboard />
//     </ProtectedAdminRoute>
//   }
// />

// <Route
//     path="/admin/add-exam"
//     element={
//       <ProtectedAdminRoute>
//         <CreateExam />
//       </ProtectedAdminRoute>
//     }
//   />



// <Route
//   path="/admin/add-test-series"
//   element={
//     <ProtectedAdminRoute>
//       <CreateTestSeries />
//     </ProtectedAdminRoute>
//   }
// />

// <Route
//   path="/admin/add-pyp"
//   element={
//     <ProtectedAdminRoute>
//       <CreatePYP />
//     </ProtectedAdminRoute>
//   }
// />

// <Route
//   path="/admin/create-test"
//   element={
//     <ProtectedAdminRoute>
//       <CreateTest />
//     </ProtectedAdminRoute>
//   }
// />

// <Route
//   path="/admin/add-question"
//   element={
//     <ProtectedAdminRoute>
//       <CreateQuestion />
//     </ProtectedAdminRoute>
//   }
// />

// <Route
//   path="/admin/users"
//   element={
//     <ProtectedAdminRoute>
//       <AdminUsers />
//     </ProtectedAdminRoute>
//   }
// />

// <Route
//   path="/admin/user/:id"
//   element={
//     <ProtectedAdminRoute>
//       <UserPerformance />
//     </ProtectedAdminRoute>
//   }
// />

//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/exams" element={<AllExam />} />
//           <Route path="/exam/:slug" element={<TestSeriesList />} />
//           <Route path="/instructions/:testId" element={<InstructionsPage />} />
//           <Route path="/start-test/:testId" element={<TestEngine />} />
//           <Route path="/result/:attemptId" element={<ResultPage/>} />
//           <Route path="/review/:attemptId" element={<ReviewPage />} />


//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;





import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import InstallApp from "./components/InstallApp";

// 🔥 Lazy Loading (Code Splitting)
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AllExam = lazy(() => import("./pages/AllExam"));
const TestSeriesList = lazy(() => import("./components/exams/TestSeriesList"));
const InstructionsPage = lazy(() => import("./pages/InstructionsPage"));
const TestEngine = lazy(() => import("./pages/TestEngine"));
const ResultPage = lazy(() => import("./pages/ResultPage"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const AttemptList = lazy(() => import("./pages/AttemptList"));
const SolutionPage = lazy(() => import("./pages/SolutionPage"));
const AnalysisPage = lazy(() => import("./pages/AnalysisPage"));
const CurrentAffairs = lazy(() => import("./pages/CurrentAffairs"));
const CurrentAffairDetails = lazy(() => import("./pages/CurrentAffairDetails"));

// Admin
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const CreateExam = lazy(() => import("./components/admin/CreateExam"));
const CreateTestSeries = lazy(() => import("./components/admin/CreateTestSeries"));
const CreatePYP = lazy(() => import("./components/admin/CreatePYP"));
const CreateTest = lazy(() => import("./components/admin/CreateTest"));
const CreateQuestion = lazy(() => import("./components/admin/CreateQuestion"));
const AdminUsers = lazy(() => import("./components/admin/AdminUsers"));
const UserPerformance = lazy(() => import("./components/admin/UserPerformance"));
const AddQuestionBulk = lazy(() => import("./components/admin/AddQuestionBulk"));
const AdminGenerateCA = lazy(() => import("./components/admin/AdminGenerateCA"));


// Layout
import Header from "./components/Header";
// import AdminGenerateCA from "./components/admin/AdminGenerateCA";
// import CurrentAffair from "../../backend/models/CurrentAffair";
// import CurrentAffairs from "./pages/CurrentAffairs";
// import CurrentAffairDetails from "./pages/CurrentAffairDetails";


// 🔥 Loader Component (Better UX)
const Loader = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
  </div>
);


// 🔥 Layout Wrapper (Header Control)
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};


// 🔥 Hide Header for Test Engine (Full Screen)
const TestLayout = ({ children }) => {
  return <>{children}</>;
};


function AppContent() {
  const { loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <InstallApp />

      <Suspense fallback={<Loader />}>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/exams" element={<Layout><AllExam /></Layout>} />
          <Route path="/exam/:slug" element={<Layout><TestSeriesList /></Layout>} />

          {/* TEST FLOW (NO HEADER) */}
          <Route path="/instructions/:testId" element={<TestLayout><InstructionsPage /></TestLayout>} />
          <Route path="/start-test/:testId" element={<TestLayout><TestEngine /></TestLayout>} />
          <Route path="/result/:attemptId" element={<TestLayout><ResultPage /></TestLayout>} />
          <Route path="/review/:attemptId" element={<TestLayout><ReviewPage /></TestLayout>} />
          <Route path="/attempt-analysis" element={<TestLayout><AttemptList /></TestLayout>} />
          <Route path="/solution/:attemptId" element={<TestLayout><SolutionPage /></TestLayout>} />
          <Route path="/analysis/:attemptId" element={<TestLayout><AnalysisPage /></TestLayout>} />
          <Route path="/current-affairs" element={<TestLayout><CurrentAffairs /></TestLayout>} />
          <Route path="/ca/:idcurrent-affairs" element={<TestLayout><CurrentAffairDetails /></TestLayout>} />

          {/* <Route path="/current-affairs" element={<CurrentAffairs />} /><.   Route path="/ca/:id" element={<CurrentAffairDetails />} /> */}



          {/* ADMIN ROUTES */}
          <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedAdminRoute>
          } />

          <Route path="/admin/add-exam" element={
            <ProtectedAdminRoute>
              <Layout><CreateExam /></Layout>
            </ProtectedAdminRoute>
          } />

          <Route path="/admin/add-test-series" element={
            <ProtectedAdminRoute>
              <Layout><CreateTestSeries /></Layout>
            </ProtectedAdminRoute>
          } />

          <Route path="/admin/add-pyp" element={
            <ProtectedAdminRoute>
              <Layout><CreatePYP /></Layout>
            </ProtectedAdminRoute>
          } />

          <Route path="/admin/create-test" element={
            <ProtectedAdminRoute>
              <Layout><CreateTest /></Layout>
            </ProtectedAdminRoute>
          } />

          <Route path="/admin/add-question" element={
            <ProtectedAdminRoute>
              <Layout><CreateQuestion /></Layout>
            </ProtectedAdminRoute>
          } />

            <Route path="/admin/add-question-bulk" element={
            <ProtectedAdminRoute>
              <Layout><AddQuestionBulk /></Layout>
            </ProtectedAdminRoute>
          } />

          {/* <Route path="/admin/add-question-bulk" element={<AddQuestionBulk />} /> */}

          <Route path="/admin/users" element={
            <ProtectedAdminRoute>
              <Layout><AdminUsers /></Layout>
            </ProtectedAdminRoute>
          } />

          <Route path="/admin/user/:id" element={
            <ProtectedAdminRoute>
              <Layout><UserPerformance /></Layout>
            </ProtectedAdminRoute>
          } />

           <Route path="/admin/add-current-affairs" element={
            <ProtectedAdminRoute>
              <Layout><AdminGenerateCA /></Layout>
            </ProtectedAdminRoute>
          } />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}


// 🔥 ROOT APP
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;


















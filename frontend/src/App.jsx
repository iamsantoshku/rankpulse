


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
import Footer from "./components/Footer";
import Sidebar from "./components/home/Sidebar";
import AdminLayout from "./components/admin/AdminLayout";


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
const DailyQuizPage = lazy(() => import("./pages/DailyQuizPage"));
const QuizAttemptPage = lazy(() => import("./pages/QuizAttemptPage"));
const QuizResultPage = lazy(() => import("./pages/QuizResultPage"));
const StudyNotesPage = lazy(() => import("./pages/notes/StudyNotesPage"));
const SubjectNotesPage = lazy(() => import("./pages/notes/SubjectNotesPage"));
const NotesViewerPage = lazy(() => import("./pages/notes/NotesViewerPage"));
const AIChat = lazy(() => import("./components/ai/AIChat"));




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
const AdminQuizPage = lazy(() => import("./components/admin/AdminQuizPage"));
const AdminStudyNotes = lazy(() => import("./components/admin/AdminStudyNotes"));
// const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));


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
    {/* <Header />
    
    {children}
     <Footer /> */}

    <div className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <Header />

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}


      <main
        className="
    md:ml-[270px]
    ml-0
    pt-0
    min-h-screen
    transition-all
    duration-300
  "
      >
        {children}


      </main>
    </div>
  </>
);

const TestLayout = ({ children }) => (
  <div className="bg-gray-100 min-h-screen">
    {children}
  </div>
);



// ================= APP CONTENT =================




const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">


      <Header />

      <Sidebar />


      {/* Main Content */}
      <main
        className="
    md:ml-[270px]
    ml-0
    pt-0
    min-h-screen
    transition-all
    duration-300
  "
      >
        {children}

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};
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
            path="/ai-chat"
            element={<MainLayout><AIChat /> </MainLayout>}
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
                <Layout><ResultPage /></Layout>
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
                <Layout><AttemptList /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/solution/:attemptId"
            element={
              <ProtectedRoute>
                <Layout><SolutionPage /></Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analysis/:attemptId"
            element={
              <ProtectedRoute>
                <Layout><AnalysisPage /></Layout>
              </ProtectedRoute>
            }
          />


          <Route
            path="/daily-quiz"
            element={<Layout><DailyQuizPage /></Layout>}
          />

          <Route
            path="/daily-quiz/:id"
            element={<Layout><QuizAttemptPage /></Layout>}
          />

          <Route
            path="/daily-result"
            element={<Layout><QuizResultPage /></Layout>}
          />


          <Route
            path="/study-notes"
            element={
              <Layout>
                <StudyNotesPage />
              </Layout>
            }
          />

          <Route
            path="/study-notes/:examId"
            element={
              <Layout>
                <SubjectNotesPage />
              </Layout>
            }
          />

          <Route
            path="/study-notes/:examId/:subject"
            element={
              <Layout>
                <NotesViewerPage />
              </Layout>
            }
          />


          {/* ================= ADMIN ROUTES ================= */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><Dashboard /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-exam"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><CreateExam /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-test-series"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><CreateTestSeries /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-pyp"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><CreatePYP /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/create-test"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><CreateTest /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-question"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><CreateQuestion /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-question-bulk"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><AddQuestionBulk /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><AdminUsers /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/user/:id"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><UserPerformance /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-current-affairs"
            element={
              <ProtectedAdminRoute>
                <AdminLayout><AdminGenerateCA /></AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/daily-quiz"
            element={
              <ProtectedAdminRoute>
                <AdminQuizPage />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/add-notes"
            element={
              <ProtectedAdminRoute>
                <Layout>
                  <AdminStudyNotes />
                </Layout>
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
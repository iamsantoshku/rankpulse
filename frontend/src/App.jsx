// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import Header from './components/Header'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <Header/>

//     <h1 className="text-3xl font-bold text-red-500 mt-10 p-10" >
//       Tailwind is working 🚀
//     </h1>

//     </>
//   )
// }

// export default App




import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Dashboard from "./components/admin/Dashboard";
// import CreateExam from "./components/admin/Createexam";
import CreateExam from "./components/admin/CreateExam";
import AllExam from "./pages/AllExam";
import CreateTestSeries from "./components/admin/CreateTestSeries";
import CreatePYP from "./components/admin/CreatePYP";
// import ExamTests from "./pages/ExamTests";
import TestSeriesList from "./components/exams/TestSeriesList";
import CreateQuestion from "./components/admin/CreateQuestion";
import CreateTest from "./components/admin/CreateTest";
import InstructionsPage from "./pages/InstructionsPage";
import TestEngine from "./pages/TestEngine";
import ResultPage from "./pages/ResultPage";
import ReviewPage from "./pages/ReviewPage";
import InstallApp from "./components/InstallApp";
function App() {

  const { loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <AuthProvider>
      <BrowserRouter>
      <InstallApp />
         
        <Header />
        <Routes>
          

          <Route
  path="/admin/dashboard"
  element={
    <ProtectedAdminRoute>
      <Dashboard />
    </ProtectedAdminRoute>
  }
/>

<Route
    path="/admin/add-exam"
    element={
      <ProtectedAdminRoute>
        <CreateExam />
      </ProtectedAdminRoute>
    }
  />



<Route
  path="/admin/add-test-series"
  element={
    <ProtectedAdminRoute>
      <CreateTestSeries />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/add-pyp"
  element={
    <ProtectedAdminRoute>
      <CreatePYP />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/create-test"
  element={
    <ProtectedAdminRoute>
      <CreateTest />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/add-question"
  element={
    <ProtectedAdminRoute>
      <CreateQuestion />
    </ProtectedAdminRoute>
  }
/>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exams" element={<AllExam />} />
          {/* <Route path="/exam/:slug" element={<ExamTests />} /> */}
          <Route path="/exam/:slug" element={<TestSeriesList />} />
          <Route path="/instructions/:testId" element={<InstructionsPage />} />
          <Route path="/start-test/:testId" element={<TestEngine />} />
          <Route path="/result/:attemptId" element={<ResultPage/>} />
          <Route path="/review/:attemptId" element={<ReviewPage />} />


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;




















// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import Header from "./components/Header";

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

// function App() {
//   const { loading } = useContext(AuthContext);

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <BrowserRouter>
//       <Header />

//       <Routes>

//         {/* PUBLIC */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
      

//         {/* TEST FLOW */}
//           <Route path="/exam" element={<AllExam />} />
//          <Route path="/exam/:slug" element={<TestSeriesList />} />
//         <Route path="/instructions/:testId" element={<InstructionsPage />} />
//         <Route path="/start-test/:testId" element={<TestEngine />} />
//         <Route path="/result/:attemptId" element={<ResultPage />} />
//         <Route path="/review/:attemptId" element={<ReviewPage />} />

//         {/* ADMIN */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedAdminRoute>
//               <Dashboard />
//             </ProtectedAdminRoute>
//           }
//         />

//         <Route path="/admin/create-exam" element={<CreateExam />} />
//         <Route path="/admin/create-series" element={<CreateTestSeries />} />
//         <Route path="/admin/create-pyp" element={<CreatePYP />} />
//         <Route path="/admin/create-test" element={<CreateTest />} />
//         <Route path="/admin/create-question" element={<CreateQuestion />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
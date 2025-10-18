import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MainLayout from "./MainLayout";
import Signup from "./pages/Signup";
import MCQS from "./pages/MCQS";
import Verification from "./components/Verification";
import FeedbackForm from "./components/FeedbackForm";
import DashboardMain from "./pages/dashboard/DashboardMain";
import { useContext } from "react";
import UserContext from "./Store/UserContext";
import NotFound from "./pages/NotFound";
import Users from "./pages/dashboard/Users";
import All_MCQS from "./pages/dashboard/All_MCQS";
import All_Feedbacks from "./pages/dashboard/All_Feedbacks";
import PointsTable from "./pages/PointsTable";
import ForgetPasswordLink from "./components/ForgetPasswordLink";
import ForgetPassword from "./components/ForgetPassword";


function App() {
  const { userDetails } = useContext(UserContext);

  return (
    <>
      {/* <Navbar/> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />

          <Route
            path="/mcqs"
            element={
              <>
                <Navbar />
                <MCQS />
              </>
            }
          />

          <Route
            path="/feedback"
            element={
              <>
                <Navbar />
                <FeedbackForm />
              </>
            }
          />

          <Route
            path="/points"
            element={
              <>
                <Navbar />
                <PointsTable />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/forgetPassword" element={<ForgetPasswordLink/>}/>
          <Route path="/forgetPassword/:id" element={<ForgetPassword/>}/>

          {userDetails?.isAdmin === true && (
            <Route path="/admin">
              <Route path="dashboard" element={<DashboardMain />} />
              <Route path="users" element={<Users />} />
              <Route path="mcqs" element={<All_MCQS/>}/>
              <Route path="feedbacks" element={<All_Feedbacks/>}/>
            </Route>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </>
  );
}

export default App;

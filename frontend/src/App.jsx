import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ForgotPassword from "./features/auth/ForgotPassword";
import VerifyCode from "./features/auth/VerifyCode";
import ResetPassword from "./features/auth/ResetPassword";
import PasswordCreated from "./features/auth/PasswordCreated";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ProfilePage from "./pages/profile/ProfilePage";
import ProfileUserView from "./features/profile/ProfileUserView";
import ProfileTrainerView from "./features/profile/ProfileTrainerView";
import ClassPost from "./pages/ClassPost/ClassPost";
import PrivateRoute from "./PrivateRoute";
import HireClass from "./pages/HireClass/HireClass";
import TrainerProfileClientView from "./pages/profile/TrainerProfileClientView";
import Payment from "./pages/Payment/Payment";
import ProfileClientEdit from "./pages/profile/ProfileClientEdit";
import ProfileTrainerEdit from "./pages/profile/ProfileTrainerEdit";
import SuccessScreen from "./pages/SuccessScreen/SuccessScreen";
import ServicesHistory from "./pages/ServicesHistory/ServicesHistory";
import ServicesHistoryTrainer from "./pages/ServicesHistory/ServicesHistoryTrainer";
import ClientProfileTrainerView from "./pages/profile/ClientProfileTrainerView";
import TrainerArchive from "./components/profile/trainerView/trainerArchive";
import TrainerRequests from "./features/profile/classRequests/TrainerRequests";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/profile/user"
            element={
              <PrivateRoute>
                <ProfileUserView />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/trainer"
            element={
              <PrivateRoute>
                <ProfileTrainerView />
              </PrivateRoute>
            }
          />
          <Route
            path="/class/:id"
            element={
              <PrivateRoute>
                <ClassPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/hire-class/:id"
            element={
              <PrivateRoute>
                <HireClass />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="/success"
            element={
              <PrivateRoute>
                <SuccessScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/trainer/archive"
            element={
              <PrivateRoute>
                <TrainerArchive />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/trainer/requests"
            element={
              <PrivateRoute>
                <TrainerRequests />
              </PrivateRoute>
            }
          />

          <Route
            path="/trainer-profile-client-view/:id"
            element={
              <PrivateRoute>
                <TrainerProfileClientView />
              </PrivateRoute>
            }
          />
          <Route
            path="/client-profile-trainer-view/:id"
            element={
              <PrivateRoute>
                <ClientProfileTrainerView />
              </PrivateRoute>
            }
          />
          <Route
            path="/history/client"
            element={
              <PrivateRoute>
                <ServicesHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/history/trainer"
            element={
              <PrivateRoute>
                <ServicesHistoryTrainer />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          path="/profile/client/edit"
          element={
            <PrivateRoute>
              <ProfileClientEdit />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/trainer/edit"
          element={
            <PrivateRoute>
              <ProfileTrainerEdit />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password-created" element={<PasswordCreated />} />
      </Routes>
    </>
  );
}

export default App;

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
        </Route>
        
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

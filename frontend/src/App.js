import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import { AppProvider } from "./Context/AppContext";
import Signup from "./Components/Signup/Signup";
import HomePage from "./Pages/HomePage";
import UserHomePage from "./Pages/UserHomePage";
import SingleAppPage from "./Pages/SingleAppPage";
import PointsPage from "./Pages/PointsPage";
import TasksPage from "./Pages/TasksPage";
import ProfilePage from "./Pages/ProfilePage";
import AdminRoute from "./Utils/AdminRoute";
import UserRoute from "./Utils/UserRoute";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <div>
      <Router>
        <AppProvider>
          <Routes>
            <Route element={<LoginPage />} path="login/" />
            <Route element={<Signup />} path="signup/" />
            <Route element={<NotFoundPage/>} path='*'/>
            
            <Route element={<UserRoute />} path="/">
              <Route element={<UserHomePage />} path="/" />
              <Route element={<SingleAppPage />} path="home-page/:slug/" />
              <Route element={<PointsPage />} path="home-page/points/" />
              <Route element={<TasksPage />} path="home-page/tasks/" />
              <Route element={<ProfilePage />} path="home-page/profile/" />
            </Route>

            <Route element={<AdminRoute />} path="admin_panel/">
              <Route element={<HomePage />} path="" />
            </Route>
          </Routes>
        </AppProvider>
      </Router>
    </div>
  );
}

export default App;

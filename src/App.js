import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Helmet } from "react-helmet";
import {
  Tasks,
  Calendar,
  Employees,
  Welcome,
  Kanban,
  NewUserFormPage,
  NewTaskFormPage,
  EditUserPage,
  EditTaskPage,
  Login,
} from "./pages";
import { Navbar, Sidebar, ThemeSettings } from "./components";
import "./App.css";
import { useStateContext } from "./context/ContextProvider";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice";

const AppContent = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();
  const location = useLocation();
  const token = useSelector(selectCurrentToken);

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <Helmet>
        <title>Employee Management System</title>
      </Helmet>

      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="relative flex dark:bg-main-dark-bg">
          {!isLoginPage && (
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                  style={{ background: currentColor, borderRadius: "50%" }}
                  onClick={() => setThemeSettings(true)}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
          )}
          {!isLoginPage && activeMenu ? (
            <div className="w-72 fixed dark:bg-secondary-dark-bg sidebar bg-white">
              <Sidebar />
            </div>
          ) : (
            !isLoginPage && (
              <div className="w-0">
                <Sidebar />
              </div>
            )
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              !isLoginPage && activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            {!isLoginPage && (
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>
            )}
            {themeSettings && <ThemeSettings />}
            <div>
              <Routes>
                {/* Redirect to login if not authenticated */}
                <Route
                  path="/"
                  element={
                    token ? (
                      <Navigate to="/welcome" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route element={<PersistLogin />}>
                  <Route
                    element={
                      <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                    }
                  >
                    <Route element={<Prefetch />}>
                      <Route path="/welcome" element={<Welcome />} />
                      {/* Pages */}
                      <Route path="/tasks" element={<Tasks />} />
                      <Route
                        element={
                          <RequireAuth
                            allowedRoles={[ROLES.Admin, ROLES.Manager]}
                          />
                        }
                      >
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/users/:id" element={<EditUserPage />} />
                        <Route
                          path="/users/new"
                          element={<NewUserFormPage />}
                        />
                      </Route>
                      {/* Apps */}
                      <Route path="/kanban" element={<Kanban />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/tasks/:id" element={<EditTaskPage />} />
                      <Route path="/tasks/new" element={<NewTaskFormPage />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

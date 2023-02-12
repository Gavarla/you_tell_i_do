import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Master from "./Views/Master/Master";
import Student from "./Views/Student/Student";
import Wrapper from "./Wrapper/Wrapper";
import Protected from "./ProtectedRoute/ProtectedRoute";

function App() {
  useEffect(() => {
    const getItem = JSON.parse(localStorage.getItem("usersList")) || [];
    if (!getItem.length) {
      localStorage.setItem(
        "usersList",
        JSON.stringify([
          ...getItem,
          {
            email: "master@master.com",
            password: "master123",
            role: "master",
          },
          {
            email: "student@student.com",
            password: "student123",
            role: "student",
          },
        ])
      );
    }
  }, []);
  return (
    <div className="App">
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Wrapper>
                <Login />
              </Wrapper>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Wrapper>
                <Login />
              </Wrapper>
            }
          />
          <Route
            path="/register"
            element={
              <Wrapper>
                <Register />
              </Wrapper>
            }
          />
          <Route
            path="/master"
            element={
              <Protected>
                <Wrapper>
                  <Master />
                </Wrapper>
              </Protected>
            }
          />
          <Route
            path="/student"
            element={
              <Protected>
                <Wrapper>
                  <Student />
                </Wrapper>
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

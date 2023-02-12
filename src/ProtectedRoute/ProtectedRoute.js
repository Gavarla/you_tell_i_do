import React from "react";
import { useLocation } from "react-router-dom";
import NotFound  from "./index.js"

function ProtectedRoute(props) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("token"));
  if (
    (user.role === "master" && location.pathname === "/student") ||
    (user.role === "student" && location.pathname === "/master")
  ) {
    return <div>
    <NotFound />
  </div>;
  } else if (user) {
    return <>{props.children}</>;
  }
  return <div><NotFound /></div>;
}

export default ProtectedRoute;

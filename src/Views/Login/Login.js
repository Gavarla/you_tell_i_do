import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../../constants/ToastConfig";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const onSubmit = (data) => {
    if (isValid) {
      const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
      const user = usersList?.filter(
        (ele) => ele.email === data.email && ele.password === data.password
      )[0];
      if (["student", "master"]?.includes(user?.role)) {
        localStorage.setItem("token", JSON.stringify(user));
        toast.success(`Welcome back ${user.email}`, toastConfig);
        navigate(`/${user?.role}`);
      } else {
        toast.error("Not a valid user.", toastConfig);
      }
    }
  };

  return (
    <div className="main">
      <div className="container">
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">Sign In</h1>
            <p className="text text-normal">
              New user?{" "}
              <span>
                <Link to="/register" className="text text-links">
                  Create an account
                </Link>
              </span>
            </p>
          </div>
          <form name="signin" className="form">
            <div className="input-control">
              <label htmlFor="email" className="input-label" hidden>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-field"
                placeholder="Email Address"
                {...register("email", {
                  required: true,
                  pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                })}
              />
            </div>
            <div className="error-block">
              {errors.email?.type === "required" && (
                <small role="alert">*Email is required.</small>
              )}
              {errors.email?.type === "pattern" && (
                <small role="alert">*Enter a valid email.</small>
              )}
            </div>
            <div className="input-control">
              <label htmlFor="password" className="input-label" hidden>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input-field"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
            </div>
            <div className="error-block">
              {errors.password?.type === "required" && (
                <small role="alert">*Password is required.</small>
              )}
              {errors.password?.type === "minLength" && (
                <small role="alert">
                  *Password should have atleast 6 characters.
                </small>
              )}
            </div>
            <div className="input-control" style={{ justifyContent: "center" }}>
              <input
                type="submit"
                name="submit"
                className="input-submit"
                value="Sign In"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
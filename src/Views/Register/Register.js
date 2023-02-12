import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../../constants/ToastConfig";

import "./Register.css";
function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const [role, setRole] = useState("");
  const onSubmit = (data) => {
    if (isValid) {
      const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
      usersList.push({ ...data, role: role ? role : "master" });
      localStorage.setItem("usersList", JSON.stringify(usersList));
      toast.success(`Sign Up Sucessfull ${data.email}`, toastConfig);
      navigate("/login");
    }
  };
  return (
    <div className="main">
      <div className="container">
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">Register</h1>
            <p className="text text-normal">
              Already Existing User?{" "}
              <span>
                <Link to="/login" className="text text-links">
                  Sign In
                </Link>
              </span>
            </p>
          </div>
          <form name="register" className="form">
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
            <div className="input-control">
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                  style={{ display: "inline-block" }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="master"
                  name="radio-buttons-group"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="master"
                    control={<Radio />}
                    label="Master"
                  />
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="input-control" style={{ justifyContent: "center" }}>
              <input
                type="submit"
                name="submit"
                className="input-submit"
                value="Sign Up"
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

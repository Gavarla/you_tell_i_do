import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./Master.css";
import { toastConfig } from "../../constants/ToastConfig";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Master() {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, setValue },
  } = useForm();
  const onSubmit = (data) => {
    const masterDetails = JSON.parse(localStorage.getItem("token")) || {};
    sendQuestionToStudentAndTeacher({
      ...data,
      question_by: masterDetails.email,
    });
  };
  const [students, setStudents] = useState([]);
  const [probs, SetProbs] = useState([]);

  useEffect(() => {
    getToken();
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const filtered =
      usersList
        .filter((ele) => ele.role === "student")
        .map((ele) => ({ ...ele, label: ele.email })) || [];
    setStudents(filtered);
  }, []);
  const getToken = () => {
    const userData = JSON.parse(localStorage.getItem("token")) || [];
    SetProbs(userData.questions);
  };
  const sendQuestionToStudentAndTeacher = (obj) => {
    obj.id = (Math.random() * 9999999999).toFixed(0);
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    let token = JSON.parse(localStorage.getItem("token")) || {};
    const masterIndex = usersList.findIndex((ele) => ele.email === token.email);
    const studentIndex = usersList.findIndex(
      (ele) => ele.email === obj.question_to
    );
    if (masterIndex !== -1 && studentIndex !== -1) {
      if (!usersList[masterIndex].questions) {
        usersList[masterIndex].questions = [];
      }
      if (!usersList[studentIndex].questions) {
        usersList[studentIndex].questions = [];
      }
      usersList[masterIndex].questions.push(obj);
      usersList[studentIndex].questions.push(obj);

      if (!token?.questions) {
        token = {
          ...token,
          questions: [],
        };
      }
      token.questions.push(obj);
      localStorage.setItem("token", JSON.stringify(token));
      getToken();
      toast.success(`Question sent to student:${obj.question_to}`, toastConfig);
    } else {
      toast.error(
        `Error while sending question to student:${obj.question_to}`,
        toastConfig
      );
    }
    localStorage.setItem("usersList", JSON.stringify(usersList));
  };

  return (
    <div className="main">
      <div className="container">
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">Ask a question</h1>
          </div>
          <form name="ask-a-question" className="form">
            <div className="input-control">
              <input
                type="text"
                name="question"
                className="input-field"
                placeholder="Enter the question"
                {...register("question", {
                  required: true,
                })}
              />
            </div>
            <div className="error-block">
              {errors.email?.type === "required" && (
                <small role="alert">*Email is required.</small>
              )}
            </div>
            <div className="input-container" style={{ marginBottom: "1rem" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={students}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      {...register("question_to")}
                      label="email"
                    />
                  );
                }}
              />
            </div>
            <div className="input-control" style={{ justifyContent: "center" }}>
              <input
                type="submit"
                name="submit"
                className="input-submit"
                value="Send Question"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </section>
        <section>
          <div className="heading">
            <h1 className="text text-large">
              Asked Questions and its Solutions
            </h1>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Problem</TableCell>
                  <TableCell>Answered By</TableCell>
                  <TableCell>Solution</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {probs &&
                  probs.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.question}</TableCell>
                      <TableCell>{row.question_to}</TableCell>
                      <TableCell>
                        {row?.answer ? row?.answer : "Not Answered yet"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </div>
    </div>
  );
}

export default Master;
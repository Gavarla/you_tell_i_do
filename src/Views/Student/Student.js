import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../../constants/ToastConfig";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getSolution } from "../../service/CalculationService";
function Login() {
  const [probs, SetProbs] = useState([]);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    const userData = JSON.parse(localStorage.getItem("token")) || [];
    SetProbs(userData.questions);
    return userData;
  };
  const sendAnswer = (row) => {
    const solution = getSolution(row);
    row.answer = solution;
    console.log("ans", row);
    sendAnswerToStudentAndTeacher(row);
  };

  const sendAnswerToStudentAndTeacher = (obj) => {
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const token = JSON.parse(localStorage.getItem("token")) || {};
    const masterIndex = usersList.findIndex(
      (ele) => ele.email === obj.question_by
    );
    const studentIndex = usersList.findIndex(
      (ele) => ele.email === token.email
    );
    if (masterIndex !== -1 && studentIndex !== -1) {
      if (!usersList[masterIndex].questions) {
        usersList[masterIndex].questions = [];
      }
      if (!usersList[studentIndex].questions) {
        usersList[studentIndex].questions = [];
      }
      const questionIndexMaster = usersList[masterIndex].questions.findIndex(
        (ele) => ele.id === obj.id
      );
      const questionIndexStudent = usersList[studentIndex].questions.findIndex(
        (ele) => ele.id === obj.id
      );
      console.log(obj);
      usersList[masterIndex].questions[questionIndexMaster] = obj;
      usersList[studentIndex].questions[questionIndexStudent] = obj;
      localStorage.setItem("token", JSON.stringify(usersList[studentIndex]));
      toast.success(
        `Question answered to master:${obj.question_by}`,
        toastConfig
      );
    } else {
      toast.error(
        `Error while sending answer to master:${obj.question_by}`,
        toastConfig
      );
    }
    console.log("suers", usersList);
    getToken();
    console.log("rpobs", probs);
    localStorage.setItem("usersList", JSON.stringify(usersList));
  };

  return (
    <div className="student-container">
      <h1 className="text text-large">Submit Answers</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>

              <TableCell>Problem</TableCell>
              <TableCell>Asked By</TableCell>
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
                  <TableCell>{row.question_by}</TableCell>
                  <TableCell>
                    {row?.answer ? (
                      row?.answer
                    ) : (
                      <button onClick={() => sendAnswer(row)}>
                        Send ANswer
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Login;
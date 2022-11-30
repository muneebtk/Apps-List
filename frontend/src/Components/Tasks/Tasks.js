import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../Utils/axios";
import AppContext from "../../Context/AppContext";

function Tasks() {
  const [tasks, setTasks] = useState();
  let { authTokens } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${authTokens ? authTokens.access : null}`,
    },
  };
  let getCompletedTasks = () => {
    axios
      .get("home_page/completed-tasks/", config)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getCompletedTasks();
  }, []);

  return (
    <div style={{margin:'auto'}}>
      <TableContainer component={Paper}>
        <Table  sx={{width:'550px',}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">App Name</TableCell>
              <TableCell align="center">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              ? tasks.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.app}</TableCell>
                    <TableCell align="center">{row.point}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Tasks;

import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Sidebar from "../Components/Sidebar/Sidebar";
import Tasks from "../Components/Tasks/Tasks";

function TasksPage() {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Tasks />
      </div>
    </div>
  );
}

export default TasksPage;

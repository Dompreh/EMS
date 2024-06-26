import React from "react";
import TasksList from "../features/tasks/TasksList";
import { Header } from "../components";

function Tasks() {

  return (
    <div className="text-black m-10 p-10 dark:text-white bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header title="Tasks" category="Page" />
      <TasksList/>
    </div>
  );
}

export default Tasks;

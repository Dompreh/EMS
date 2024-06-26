import React from "react";
import { useParams } from "react-router-dom";
import { useGetTasksQuery } from "./tasksApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import EditTaskForm from "./EditTaskForm";

const EditTask = () => {
  const { id } = useParams();
  const { isAdmin, isManager, username } = useAuth();

  const { task } = useGetTasksQuery("tasksList", {
    selectFromResult: ({ data }) => ({
      task: data?.entities[id],
    }),
  });

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.ids.map((id) => data?.entities[id]),
    }),
  });


  if (!user) {
    content = (
      <div className="m-2 md:m-5 p-2 md:p-5 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
        <PulseLoader color={"#000"} />
      </div>
    );
  }

  if(!isManager && !isAdmin){
    if(task.username !== username){
      return <p className="inline-block bg-white text-[rgb(178,34,34)]">No Access</p>
    }
  }

  const content = <EditTaskForm users={user} task={task} />;

  return content;
};

export default EditTask;

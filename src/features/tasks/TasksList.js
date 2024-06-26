import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Task from "./Task";
import { useGetTasksQuery } from "./tasksApiSlice";
import { useStateContext } from "../../context/ContextProvider";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import useAuth from "../../hooks/useAuth"

const TasksList = () => {
  const { currentColor } = useStateContext();
  const {isAdmin, isManager, username} = useAuth()
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery("tasksList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
        <PulseLoader color={"#000"} />
      </div>
    );

  if (isError) {
    content = (
      <p className={"inline-block bg-white text-[rgb(178,34,34)]"}>
        {error?.data?.message}
      </p>
    );
  }
  if (isSuccess) {
    const { ids,entities } = tasks;

      let filteredIds;
      if (isManager || isAdmin) {
        filteredIds = [...ids];
      } else {
        filteredIds = ids.filter(
          (taskId) => entities[taskId].username === username
        );
      }

      const tableContent =
      ids?.length && filteredIds.map((taskId) => <Task key={taskId} taskId={taskId} />);
  

    content = (
      <>
      {(isAdmin || isManager) &&        <div className="flex justify-end mb-4">
          <Link to="/tasks/new">
            <Button
              color="white"
              bgColor={currentColor}
              text="Add New Task"
              borderRadius="10px"
              size="md"
            />
          </Link>
        </div>}
 
        <table className="w-full grid text-[1rem] grid-cols-[1fr_2fr_1fr]  md:grid-cols-[repeat(3,_1fr)_2fr_repeat(2,_1fr)] border-[1px] border-solid rounded-lg">
          <thead className="datatable  sticky top-[0] z-1">
            <tr className="datatable ">
              <th
                style={{
                  backgroundColor: `${currentColor}`,
                }}
                scope="col"
                className={`text-left text-white border-[1px] border-solid  p-[0.5em] task__status`}
              >
                Status
              </th>
              <th
                style={{
                  backgroundColor: `${currentColor}`,
                }}
                scope="col"
                className={`text-left text-white border-[1px]   border-solid p-[0.5em] task__created hidden md:block`}
              >
                Created
              </th>
              <th
                style={{
                  backgroundColor: `${currentColor}`,
                }}
                scope="col"
                className={`text-left text-white border-[1px]  border-solid p-[0.5em] task__updated hidden md:block`}
              >
                Updated
              </th>
              <th
                style={{
                  backgroundColor: `${currentColor}`,
                }}
                scope="col"
                className={`text-left text-white border-[1px]  border-solid p-[0.5em] task__title`}
              >
                Tasks🎯
              </th>
              <th
                style={{
                  backgroundColor: `${currentColor}`,
                }}
                scope="col"
                className={`text-left text-white border-[1px]  border-solid p-[0.5em] task__username hidden md:block`}
              >
                Username
              </th>
              <th
                style={{
                  backgroundColor: `${currentColor}`,
                }}
                scope="col"
                className={`text-left text-white border-[1px]  border-solid p-[0.5em] task__edit `}
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="datatable">{tableContent}</tbody>
        </table>
      </>
    );
  }
  return content;
};

export default TasksList;

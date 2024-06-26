import React from 'react'
 import { useGetUsersQuery } from "../users/usersApiSlice";
import PulseLoader from 'react-spinners/PulseLoader'
import NewTaskForm from './NewTaskForm'

const NewTask = () => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    }),
  });

  if(!user?.length) {
    content = (
      <div className="m-2 md:m-5 p-2 md:p-5 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
        <PulseLoader color={"#000"} />
      </div>
    );
  }

  const content = <NewTaskForm users={user}/> 

  return content
}

export default NewTask
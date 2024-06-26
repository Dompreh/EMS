import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { tasksApiSlice } from "../tasks/tasksApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { scheduleApiSlice } from "../schedule/scheduleApiSlice";
import { kanbanApiSlice } from "../kanban/kanbanApiSlice";
import { store } from "../../app/store";

const Prefetch = () => {
  useEffect(() => {
    // console.log('subscribing')
    //manually subscribin our data so that the data doesn't disappear after 15s 0r 60s
    //   store.dispatch(tasksApiSlice.util.prefetch('getTasks', 'tasksList', {force: true}))
    //   store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force: true}))
    //   store.dispatch(scheduleApiSlice.util.prefetch('getSchedule', 'scheduleList', {force: true}))
    //   store.dispatch(kanbanApiSlice.util.prefetch('getKanban', 'kanbanList', {force: true}))
    store.dispatch(
      tasksApiSlice.util.prefetch("getTasks", "tasksList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
  }, []);
  return <Outlet />;
};

export default Prefetch;

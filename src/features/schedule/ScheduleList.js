import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import {
  ScheduleComponent,
  Inject,
  WorkWeek,
  Day,
  Week,
  DragAndDrop,
  Month,
  Agenda,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import useAuth from "../../hooks/useAuth";
import {
  useGetScheduleQuery,
  useAddNewScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} from "./scheduleApiSlice";
import { useStateContext } from "../../context/ContextProvider";

function ScheduleList() {
  const { username, id } = useAuth();
  const {
    data: schedule,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetScheduleQuery();
  const [addNewSchedule] = useAddNewScheduleMutation();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [deleteSchedule] = useDeleteScheduleMutation();

  const handleAdd = async (args) => {
    console.log("Adding:", args);
    const addedRecord = args.addedRecords[0];
    addedRecord.username = username;
    addedRecord.user = id;
    addedRecord.CategoryColor = "#357cd2";
    try {
      await addNewSchedule(addedRecord).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to add the task:", error);
      addedRecord = args.addedRecords[0];
      addedRecord.username = username;
      addedRecord.user = id;
      addedRecord.CategoryColor = "#357cd2";
      await addNewSchedule(addedRecord).unwrap();
      refetch();
    }
  };

  const handleUpdate = async (args) => {
    console.log("Updating:", args);
    const changedRecord = args.changedRecords[0];
    changedRecord.user = id;
    try {
      await updateSchedule(changedRecord).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to add the task:", error);
      changedRecord = args.changedRecords[0];
      changedRecord.user = id;
      await updateSchedule(changedRecord).unwrap();
      refetch();
    }
  };

  const handleDelete = async (args) => {
    console.log("Deleting:", args);
    const deletedRecord = args.deletedRecords[0];
    const id = deletedRecord.id;

    try {
      await deleteSchedule({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete the task:", error);
    }
  };

  const { currentMode } = useStateContext();
  let content;
  if (isLoading) {
    content = (
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
        <PulseLoader color={"#000"} />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
        <p className="inline-block bg-white text-[rgb(178,34,34)]">
          {error?.data?.message}
        </p>
      </div>
    );
  } else if (isSuccess) {
    const { ids, entities } = schedule;
    const filteredIds = ids.filter((item) => entities[item].username === username)

    const filteredScheduleData = filteredIds.map((items) => {
      const item = entities[items];
      return {
        Id: item.Id,
        id: item.id,
        Subject: item.Subject,
        Location: item.Location,
        StartTime: item.StartTime,
        EndTime: item.EndTime,
        CategoryColor: item.CategoryColor,
        username: item.username,
        user: item.user,
      };
    });

    content = (
      <div>
        <ScheduleComponent
          height="650px"
          eventSettings={{ dataSource: filteredScheduleData }}
          actionComplete={(args) => {
            if (args.requestType === "eventCreated") {
              handleAdd(args);
            } else if (args.requestType === "eventChanged") {
              handleUpdate(args);
            } else if (args.requestType === "eventRemoved") {
              handleDelete(args);
            }
          }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
        >
          <Inject
            services={[Day, Week, Month, WorkWeek, DragAndDrop, Resize, Agenda]}
          />
        </ScheduleComponent>
      </div>
    );
  }
  return content;
}

export default ScheduleList;
